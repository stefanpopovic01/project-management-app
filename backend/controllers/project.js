const Project = require("../models/Project");
const Task = require("../models/Task");

async function getUserProjects(req, res) {
    try {

        const projects = await Project.find({ creator: req.user.id })
         
        return res.status(200).json({
            count: projects.length,
            projects
        })

    } catch (err) {
        return res.status(500).json({ error: err.message })
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



module.exports = { getUserProjects, createProject, getProject, updateProject, deleteProject };