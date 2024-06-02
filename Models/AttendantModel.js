const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const Event = require('./EventModel');


const attendant = sequelize.define('Attendant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
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
  timestamps: true
});

module.exports = attendant;