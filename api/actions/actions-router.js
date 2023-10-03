const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();
const {
    validateActionsId,
} = require('./actions-middlware');

// GET /api/actions
router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (error) {
    next(error);
  }
});

// GET /api/actions/:id
router.get('/:id', validateActionsId, (req, res) => {
  res.json(req.actions);
});

// POST /api/actions
router.post('/', async (req, res, next) => {
  const { project_id, description, notes, completed } = req.body;
  if (!project_id || !description || !notes || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Missing or invalid request body fields' });
  }

  try {
    const newAction = await Actions.insert({
      project_id,
      description,
      completed,
      notes,
    });
    res.status(201).json(newAction);
  } catch (error) {
    next(error);
  }
});

// PUT /api/actions/:id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Missing notes, description, completed, or project_id' });
  }

  try {
    const updatedAction = await Actions.update(id, {
      project_id,
      description,
      notes,
      completed,
    });

    if (updatedAction) {
      res.status(200).json(updatedAction);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/actions/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.actions);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'Error: <INSIDE-ACTIONS>',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;