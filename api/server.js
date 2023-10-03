const express = require('express');
const server = express();

server.use(express.json());
const { logger } = require ('./actions/actions-middlware');
server.use(logger);

const projectsRouter = require('./projects/projects-router');
server.use('/api/projects', projectsRouter);

const actionsRouter = require('./actions/actions-router');
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the API. Please visit the following endpoints:",
    endpoints: {
      projects: "/api/projects",
      actions: "/api/actions",
    }
  });
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;