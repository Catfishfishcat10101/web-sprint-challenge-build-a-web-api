// Write your "projects" router here!
const express = require('express');
const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware');
const Projects = require('./projects-model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert({ name: req.body.name, description: req.body.description, completed: req.body.completed });
        res.status(201).json(newProject);
    } catch(err) {
        next(err);
    }
});

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, { name: req.body.name, description: req.body.description, completed: req.body.completed });
        res.status(200).json(updatedProject);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const deletedProject = await Projects.remove(req.params.id);
        res.status(200).json(deletedProject);
    } catch(err) {
        next(err);
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const projectActions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(projectActions);
    } catch(err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something didnt work in the router',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;