// add middlewares here related to projects
const Projects = require('./projects-model');

async function checkId (req, res, next) {
    try{
    const valId = await Projects.get(req.params.id)
    if(!valId){
       res.status(404).json('project not found')
    }else{
        req.project = valId
        next()
    }
    }catch(err){
        res.status(500).json({
            message: 'error finding project'
        })
    }
}

function checkPost (req, res, next) {
    const {name, description, completed} = req.body;
    if(!name || !description || completed == null){
        res.status(400).json({
            message: 'name and description required'
        })
    }else{
        req.name = name.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}




module.exports = {
    checkId,
    checkPost
}