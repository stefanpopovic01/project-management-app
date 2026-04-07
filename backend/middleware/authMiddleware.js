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

module.exports = { auth };


