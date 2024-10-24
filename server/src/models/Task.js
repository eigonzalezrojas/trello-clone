const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Board = require('./Board');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'tasks',
  timestamps: false,
});

Task.belongsTo(Board, { foreignKey: 'board_id', onDelete: 'CASCADE' });

module.exports = Task;