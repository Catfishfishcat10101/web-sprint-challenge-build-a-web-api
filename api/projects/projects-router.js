const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();
const {
  validateProjectId,
  validateProjectName,
  validateProjectInfo,
  validateProjectComplete,
} = require('./projects-middleware');

// GET /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.projects);
});

// POST /api/projects
router.post(
  '/',
  validateProjectName,
  validateProjectInfo,
  validateProjectComplete,
  async (req, res, next) => {
    const { name, description, completed } = req;
    try {
      const newProject = await Projects.insert({ name, description, completed });
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/projects/:id
router.put('/:id', validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  if (!name || !description || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Missing or invalid request body fields' });
  }

  try {
    const updatedProject = await Projects.update(id, { name, description, completed });

    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/projects/:id
router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.projects);
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const objActions = await Projects.getProjectActions(req.params.id);
    res.json(objActions);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'Error: <INSIDE-PROJECTS>',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;