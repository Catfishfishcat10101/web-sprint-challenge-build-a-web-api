const Projects = require('./projects-model');

// Middleware to validate project ID
async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);

    if (!project) {
      return res.status(404).json({ message: `Project with id:${id} not found` });
    }

    req.projects = project;
    next();
  } catch (error) {
    next(error);
  }
}

// Middleware to validate project name
function validateProjectName(req, res, next) {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return next({
      status: 400,
      message: "Missing name field",
    });
  }

  req.name = name.trim();
  next();
}

// Middleware to validate project description
function validateProjectInfo(req, res, next) {
  const { description } = req.body;

  if (!description || !description.trim()) {
    return next({
      status: 400,
      message: "Missing description field",
    });
  }

  req.description = description.trim();
  next();
}

// Middleware to validate project completeness
function validateProjectComplete(req, res, next) {
  if (req.description && req.name) {
    req.completed = true;
    next();
  } else {
    return next({
      status: 400,
      message: "Missing COMPLETED field",
    });
  }
}

module.exports = {
  validateProjectId,
  validateProjectName,
  validateProjectInfo,
  validateProjectComplete,
};