// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const { validateActionId, validateAction } = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateActionId, async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    res.status(200).json(action);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateAction, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateActionId, validateAction, async (req, res, next) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.status(200).json(updatedAction);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.status(200).json(req.action);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something bad inside the projects router!",
  });
});

module.exports = router;