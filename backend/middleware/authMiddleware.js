const jwt = require("jsonwebtoken");
const Project = require("../models/Project");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer'))
    return res.status(401).json({ message: 'You are not logged.' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expired.' });
  }
}

const isProjectCreator = async (req, res, next) => {

  const id = req.params.projectId || req.params.id || req.body.projectId;
  
  const project = await Project.findById(id);
  
  if (!project) return res.status(404).json({ message: "Project not found" });

  if (project.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied. Only the creator can perform this action." });
  }

  req.project = project; 
  next();
};

const isProjectMember = async (req, res, next) => {
  const projectId = req.params.projectId || req.params.id;
  const isMember = await Project.findOne({
    _id: projectId,
    $or: [
      { creator: req.user.id },
      { "members.user": req.user.id, "members.status": "accepted" }
    ]
  });

  if (!isMember) {
    return res.status(403).json({ message: "You are not a member of this project." });
  }
  next();
};

const isAccountOwner = (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).json({ 
      message: "Access denied. You can only edit your own profile." 
    });
  }
  next();
};


module.exports = { auth, isProjectCreator, isProjectMember, isAccountOwner };


