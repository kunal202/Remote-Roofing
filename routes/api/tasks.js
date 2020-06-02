const { Router } = require('express')
const { createTask, getAllTasks } = require('../../controllers/tasks')
const { Tasks } = require('../../models/index').models
const route = Router()
const Sequelize = require('sequelize')

// GET /api/tasks
route.get('/', async (req, res) => {


    const { name = '', description = '', score = '', status = '' } = req.query

    const whereClause = {
        name: { [Sequelize.Op.iLike]: `%${name}%` },
        description: { [Sequelize.Op.iLike]: `%${description}%` },
        score: score,
        status: status
    }
    const tasks = await Tasks.findAll({
        where: whereClause
    })

    if (!tasks) {
        return res.status(404).send({
            errors: {
                body: ['No Tasks Found']
            }
        })
    }

    res.send(tasks)
})

// POST /api/tasks 
route.post('/', async (req, res) => {

    let a = req.body.tasks
    const tasks = await createTask(
        a.name,
        a.description,
        a.score,
        a.status
    )
    await tasks.save();
    res.send(tasks)
})

module.exports = { route }