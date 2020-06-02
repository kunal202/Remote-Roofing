module.exports= (sequelize, DataTypes) => {
    const Users = sequelize.define('user', {
        "email": {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        "name": {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        "surname": {
            type: DataTypes.STRING
        }
    })

    
    return Users;
}