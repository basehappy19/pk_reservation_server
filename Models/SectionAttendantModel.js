const sequelize = require("../Config/database");
const { DataTypes } = require('sequelize')
const Section = require('./SectionModel');
const attendant = require('./AttendantModel')

const SectionAttendant = sequelize.define('SectionAttendant', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: Section,
          key: 'id'
        }
    },
    attendantId: {
        type: DataTypes.INTEGER,
        references: {
          model: attendant,
          key: 'id'
        }
    }
}, {
    timestamps: false
})

module.exports = SectionAttendant