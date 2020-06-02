const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'postgresql',
    storage: __dirname + '/test.db',
    database: 'roofing',
    username: 'kunal',
    password: 'Wewillrockit@2000'
})

const models = {
    Users: sequelize.import('./users'),
    Projects: sequelize.import('./projects'),
    Tasks: sequelize.import('./tasks'),
}


Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = {
    models, sequelize
}