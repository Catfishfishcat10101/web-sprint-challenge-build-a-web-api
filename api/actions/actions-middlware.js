const Actions = require('./actions-model');

// Middleware to log requests
function logger(req, res, next) {
  console.log(`[${new Date().toLocaleString()} ${req.method} to ${req.originalUrl}]`);
  next();
}

// Middleware to validate action ID
async function validateActionsId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);

    if (!action) {
      return res.status(404).json({ message: `Action with id:${id} not found` });
    }

    req.actions = action;
    next();
  } catch (error) {
    next(error);
  }
}

// Middleware to validate project ID
function validateProjectsId(req, res, next) {
  const { projectId } = req.body;

  if (!projectId) {
    return next({
      status: 400,
      message: "project_id field missing",
    });
  }

  req.project_id = projectId;
  next();
}

// Middleware to validate action description
function validateActionsInfo(req, res, next) {
  const { description } = req.body;

  if (!description || description.trim().length < 128) {
    return next({
      status: 400,
      message: "Invalid or missing description field",
    });
  }

  req.description = description.trim();
  next();
}

// Middleware to validate action notes
function validateActionsNotes(req, res, next) {
  const { notes } = req.body;

  if (!notes || !notes.trim()) {
    return next({
      status: 400,
      message: "Missing notes field",
    });
  }

  req.notes = notes.trim();
  next();
}

// Middleware to validate action completeness
function validateActionComplete(req, res, next) {
  if (!req.project_id || !req.description) {
    return next({
      status: 400,
      message: "Missing project_id or description field",
    });
  }

  req.completed = true;
  next();
}

module.exports = {
  logger,
  validateActionsId,
  validateProjectsId,
  validateActionsInfo,
  validateActionsNotes,
  validateActionComplete,
};