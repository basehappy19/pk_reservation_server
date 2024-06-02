const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const Event = require('./EventModel');

const Section = sequelize.define('Section', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  limit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    }
  }
}, {
  timestamps: false
});

module.exports = Section;