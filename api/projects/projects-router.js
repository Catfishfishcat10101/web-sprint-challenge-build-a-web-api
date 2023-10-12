// Write your "projects" router here!
const express = require('express');
const router = express.Router()
const Projects = require('./projects-model')
const { checkId, checkPost } = require('./projects-middleware')

router.get('/', async(req, res,next) =>{
    try{
        const projects = await Projects.get()
        res.json(projects)
    }catch(err){
        next(err)
    }
})

router.get('/:id', [checkId], (req, res) =>{
    res.json(req.project)
})

router.post('/', [checkPost],(req, res, next) =>{
Projects.insert(req.body)
.then(newProject =>{
    res.status(201).json(newProject)
})
.catch(next)
})

router.put('/:id', [checkId, checkPost], (req, res, next)=> {
    Projects.update(req.params.id, req.body)
    .then(()=> {
        return Projects.get(req.params.id)
    })
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.delete('/:id',[checkId],async (req, res, next) =>{
    try{
        
        await Projects.remove(req.params.id)
        res.json({message: 'project deleted'})
    }catch(err){
        next(err)
    }
})

router.get('/:id/actions', checkId, async(req, res,next) =>{
    try{
        const projActions = await Projects.getProjectActions(req.params.id)
        res.json(projActions)
    }catch(err){
        next(err)
    }
})

router.use((err, req, res, next) =>{
    res.status(req.status || 500).json({
        message: req.message

    })
})





module.exports = router;