// add middlewares here related to actions

const Actions = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Action not found",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  if (!project_id || !description || !notes || completed === undefined) {
    res.status(400).json({
      message:
        "missing required project_id, description, notes or completed field",
    });
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};