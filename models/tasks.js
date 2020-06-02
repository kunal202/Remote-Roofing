module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define('tasks', {
        "name": {
            type: DataTypes.STRING(100),
            primaryKey: true
        },
        "description": {
            type: DataTypes.TEXT,
            allowNull: false
        },
        "score": {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        "status": {
            type: DataTypes.ENUM(
                'active',
                'inactive',
                'declined',
                'completed'
            )
        },
    })


    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users, {
            foreignKey: 'userId'
        })
        Tasks.belongsToMany(models.Projects, {
            through: 'assignes',
            foreignKey: 'projectId'
        })
    }

    return Tasks;
}
