const sequelize = require('../Config/database')
const { DataTypes } = require('sequelize')
const User = require('./UserModel')

const Event = sequelize.define('Event',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    is_show: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
    }
}, {
    timestamps: true
})

module.exports = Event