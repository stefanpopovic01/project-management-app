const Task = require("../models/Task");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

async function getProjectTasks(req, res) {
  try {
    const projectId = req.params.projectId;

    const tasks = await Task.find({
      project: projectId
    })
    .populate("assignedTo", "firstName lastName email avatarUrl")
    .sort({ position: 1 });

    return res.status(200).json({
      count: tasks.length,
      tasks
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getAllUserTasks(req, res) {
  try {
    const userId = req.params.id;
    const now = new Date();

    const tasks = await Task.find({ assignedTo: userId })
    .populate("project", "title description creator");

    const totalCount = tasks.length;

    const completedCount = tasks.filter(task => task.status === 'done').length;

    const overdueCount = tasks.filter(task => {
      return task.status !== 'done' && 
             task.dueDate && 
             new Date(task.dueDate) < now;
    }).length;

    return res.status(200).json({
      tasks,
      stats: {
        total: totalCount,
        completed: completedCount,
        overdue: overdueCount,
        pending: totalCount - completedCount
      }
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getTask(req, res) {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "firstName lastName email avatarUrl")
      .populate("project", "title description creator")
      .populate({
        path: "comments.author",
        select: "firstName lastName avatarUrl"
      });

    if (!task) return res.status(404).json({ message: "Task not found." });

    const userId = req.user.id;
    const isAssignee = task.assignedTo?._id.toString() === userId;
    const isProjectCreator = task.project.creator.toString() === userId;

    if (!isAssignee && !isProjectCreator) {
      return res.status(403).json({ message: "You do not have permission to view this task." });
    }

    const totalChecklistItems = task.checklist.length;
    const completedChecklistItems = task.checklist.filter(item => item.isDone).length;

    res.status(200).json({
      ...task.toObject(),
      totalChecklistItems,
      completedChecklistItems
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createTask(req, res) {
  try {
    const { 
      title, description, project, assignedTo, 
      priority, dueDate, status, tags = [], checklist = [], comments = [] 
    } = req.body;

    const projectData = await Project.findById(project);
    if (!projectData) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (req.user.id !== projectData.creator.toString()) {
      return res.status(403).json({ message: "Not authorized to create tasks." });
    }

    const task = new Task({
      title,
      description,
      project,
      assignedTo: assignedTo || null,
      priority,
      dueDate,
      status,
      tags,
      createdBy: req.user.id,
      checklist,
      comments
    });

    await task.save();

    if (assignedTo && assignedTo !== req.user.id) {
      await Notification.create({
        recipient: assignedTo,
        actor: req.user.id,
        type: "task_assigned",
        project: project,
        message: `You have been assigned to a new task: "${title}"`
      });
    }

    res.status(201).json({
      message: "Task created successfully.",
      task
    });

  } catch (err) {

    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal server error." });
  }
}

async function updateTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found." });

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the creator can edit task details." });
    }

    Object.assign(task, req.body);
    await task.save();

    res.status(200).json({ message: "Task updated.", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateTaskStatus(req, res) {
  try {
    // const { status, position } = req.body;
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found." });

    const isCreator = task.createdBy.toString() === req.user.id;
    const isAssignee = task.assignedTo?.toString() === req.user.id;

    if (!isCreator && !isAssignee) {
      return res.status(403).json({ message: "Not authorized to move this task." });
    }

    const oldStatus = task.status;

    if (status) task.status = status;
    // if (position !== undefined) task.position = position;

    await task.save();

    if (isAssignee && status && status !== oldStatus) {
      await Notification.create({
        recipient: task.createdBy,
        actor: req.user.id,
        type: "task_moved",
        project: task.project,
        message: `Task "${task.title}" moved from ${oldStatus} to ${status}.`
      });
    }

    res.status(200).json({ message: "Task updated.", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addComment(req, res) {
  try {
    const { body } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found." });

    const isCreator = task.createdBy.toString() === req.user.id;
    const isAssignee = task.assignedTo?.toString() === req.user.id;

    if (!isCreator && !isAssignee) {
      return res.status(403).json({ message: "You are not authorized to comment." });
    }

    task.comments.push({
      author: req.user.id,
      body: body
    });

    await task.save();

    let recipientId = null;
    if (isCreator) {
      recipientId = task.assignedTo;
    } else {
      recipientId = task.createdBy;
    }

    if (recipientId) {
      await Notification.create({
        recipient: recipientId,
        actor: req.user.id,
        type: "comment_added",
        project: task.project,
        message: `New comment on task: "${task.title}"`
      });
    }

    res.status(201).json({ 
      message: "Comment added and notification sent.", 
      comments: task.comments 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id).populate("project", "createdBy");

    if (!task) return res.status(404).json({ message: "Task not found." });

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the creator can edit task details." });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateChecklistItem(req, res) {
  try {
    const { taskId, itemId } = req.params;
    const { isDone } = req.body;

    const userId = req.user.id;

    const task = await Task.findById(taskId)
      .populate("assignedTo")
      .populate("project");

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    const isAssignee = task.assignedTo?._id?.toString() === userId;
    const isCreator = task.createdBy.toString() === userId;

    if (!isAssignee && !isCreator) return res.status(403).json({ message: "Not authorized." });

    const item = task.checklist.id(itemId);

    if (!item) return res.status(404).json({ message: "Checklist item not found." });

    if (typeof isDone === "boolean") item.isDone = isDone;

    await task.save();

    res.status(200).json({
      message: "Checklist item updated.",
      item
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProjectTasks, getTask, createTask, updateTask, deleteTask, getAllUserTasks, addComment, updateTaskStatus, updateChecklistItem };