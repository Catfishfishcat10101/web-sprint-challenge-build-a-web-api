const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router')

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter)

server.get('/hello', (req, res) =>{
    res.json('hiya guys!!')
})


server.use('*', (req, res)=>{ //eslint-disable-line
    res.status(404).json({
        message: `we can't find ${req.method} on ${req.baseUrl}, sorry bro!`

    })
})


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;