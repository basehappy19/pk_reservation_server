const { DataTypes } = require('sequelize')
const sequelize = require('../Config/database')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    canManageUsers: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    
}, {
    timestamps: false
})

module.exports = User