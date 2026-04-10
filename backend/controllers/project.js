const Project = require("../models/Project");
const Task = require("../models/Task");
const Notification = require("../models/Notification");

async function getUserProjects(req, res) {
  try {
    const { search, status } = req.query;
    const userId = req.user.id;

    let query = { creator: userId };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: projects.length,
      projects
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function createProject(req, res) {
  try {
    const { title, description, deadline } = req.body;

    const project = new Project({
        title,
        description,
        deadline,
        creator: req.user.id,
        members: []
    })

    await project.save();

    return res.status(201).json({
        message: "Project created.",
        project
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

async function getProject(req, res) {
    try {
        const project = await Project.findById(req.params.id)
        .populate("creator", "firstName lastName email")
        .populate("members", "firstName lastName email")

        if (!project) return res.status(404).json({ message: "Project not found." })
        
        res.status(200).json(project);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateProject(req, res) {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!project) return res.status(404).json({ message: "Project not found." });

        res.status(200).json({ message: "Project updated.", project });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: "Project not found." });

        await Task.deleteMany({ project: project._id });

        await project.deleteOne();

        res.status(200).json({ message: "Project deleted." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function invite(req, res) {
  try {
    const { projectId, userId, role = "member", expiresAt } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const alreadyInvited = project.members.find(
      (m) => m.user.toString() === userId
    );

    if (alreadyInvited) {
      // You could even customize this: if status is 'declined', allow re-invite
      return res.status(400).json({ message: "User is already a member or has a pending invite" });
    }

    project.members.push({
      user: userId,
      invitedBy: req.user.id,
      role: role,
      status: "pending",
      invitedAt: Date.now(),
      expiresAt: expiresAt || null
    });

    await project.save();

    await Notification.create({
      recipient: userId,      // The person being invited
      actor: req.user.id,     // The person doing the inviting
      type: "member_invited", // A string matching your Notification Schema enum
      project: projectId,     // Link to the project
      message: `You have been invited to join the project: ${project.title}`
    });

    const activeMemberCount = project.members.filter(m => m.status === 'accepted').length;

    res.status(200).json({ 
      message: "User invited successfully", 
      activeMemberCount: activeMemberCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function respondInvite(req, res) {
  try {
    const { projectId, action } = req.body; // action: 'accepted' or 'declined'
    const userId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const memberEntry = project.members.find(
      (m) => m.user.toString() === userId
    );

    if (!memberEntry) {
      return res.status(403).json({ message: "You were not invited to this project" });
    }

    if (memberEntry.status !== 'pending') {
      return res.status(400).json({ message: `Already ${memberEntry.status}` });
    }

    if (action === 'accepted') {
      memberEntry.status = 'accepted';
      memberEntry.acceptedAt = Date.now();
    } else if (action === 'declined') {
      memberEntry.status = 'declined';
    } else {
      return res.status(400).json({ message: "Invalid action. Use 'accepted' or 'declined'." });
    }

    await project.save();

    res.status(200).json({ 
      message: `Invitation ${action} successfully`, 
      status: memberEntry.status 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAssignedProjects(req, res) {
  try {
    const { search, status } = req.query;
    const userId = req.user.id;

    let query = {
      members: {
        $elemMatch: {
          user: userId,
          status: "accepted"
        }
      }
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .populate("creator", "firstName lastName email");

    return res.status(200).json({
      count: projects.length,
      projects
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getProjectMembers(req, res) {
  try {

    const project = await Project.findById(req.params.id)
      .populate("members.user", "firstName lastName email avatarUrl");

    if (!project)
      return res.status(404).json({ message: "Project not found." });

    const employees = project.members
      .filter(emp => emp.status === "accepted")
      .map(emp => emp.user);

    return res.status(200).json({
      count: employees.length,
      employees
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}






module.exports = { getUserProjects, createProject, getProject, updateProject, deleteProject, invite, respondInvite, getAssignedProjects, getProjectMembers };