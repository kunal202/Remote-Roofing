const { Router } = require('express')
const { createProject } = require('../../controllers/projects')
const { Projects } = require('../../models').models
const route = Router()
const Sequelize = require('sequelize')

// GET /api/projects
route.get('/', async (req, res) => {

    const { name = '', body = '', status = '' } = req.query

    if (status.length == 0) {
        var whereClause = {
            name: { [Sequelize.Op.iLike]: `%${name}%` },
            body: { [Sequelize.Op.iLike]: `%${body}%` },
        }
    } else {
        var whereClause = {
            name: { [Sequelize.Op.iLike]: `%${name}%` },
            body: { [Sequelize.Op.iLike]: `%${body}%` },
            status: `${status}`
        }
    }
    const projects = await Projects.findAll({
        where: whereClause
    })

    if (!projects) {
        return res.status(404).send({
            errors: {
                body: ['No Project Found with that name']
            }
        })
    }

    res.send(projects)
})

// POST /api/projects 
route.post('/', async (req, res) => {

    let a = req.body.project
    if (!a.name) {
        return res.status(400).send({
            errors: {
                body: ['name is mandatory']
            }
        })
    }
    let project = await createProject(
        a.name,
        a.body,
        a.status
    )

    await project.save();
    res.send(project)

})

module.exports = { route }