const { Projects } = require('../models/index').models

async function createProject(body, name, status) {
    if (!name) {
        return new Error('Name missing')
    }

    const newProject = await Projects.create({
        body,
        name,
        status
    })

    const project = await Projects.findOne({
        attributes: [
            'body', 'name', 'status'
        ],
        where: { name: newProject.name },
    })

    return project
}

async function getAllProjects() {
    const projects = await Projects.findAll({
        attributes: [
            'body', 'name', 'status'
        ]
    })

    return projects;
}


module.exports = {
    getAllProjects,
    createProject
}