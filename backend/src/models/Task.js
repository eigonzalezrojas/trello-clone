const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Board = require('./Board');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
});

// Relacionar las tareas con los tableros
Task.belongsTo(Board, { foreignKey: 'board_id' });

module.exports = Task;