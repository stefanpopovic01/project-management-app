const Task = require("../models/Task");
const Project = require("../models/Project");

async function getProjectTasks(req, res) {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    const tasks = await Task.find({
      assignedTo: userId,
      project: projectId
    });

    return res.status(200).json({
      count: tasks.length,
      tasks
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getTask(req, res) {
    try {

        const task = await Task.findById(req.params.id)
            .populate("assignedTo", "firstName lastName email")
            .populate("project", "title description");

        if (!task)
            return res.status(404).json({ message: "Task not found." });

        // if (task.assignedTo._id.toString() !== req.user.id) {
        // return res.status(403).json({ message: "Not authorized to view this task." });
        // }

        res.status(200).json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function createTask(req, res) {
  try {
    const { 
      title, description, project, assignedTo, 
      priority, dueDate, tags = [], checklist = [], comments = [] 
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
      tags,
      createdBy: req.user.id,
      checklist,
      comments
    });

    await task.save();

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

    // if (task.assignedTo.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized to edit this task." });
    // }

    Object.assign(task, req.body);
    await task.save();

    res.status(200).json({
      message: "Task updated.",
      task
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id).populate("project", "createdBy");

    if (!task) return res.status(404).json({ message: "Task not found." });

    // if (task.project.createdBy.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized to delete this task." });
    // }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { getProjectTasks, getTask, createTask, updateTask, deleteTask };