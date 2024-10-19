const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

const Board = sequelize.define('Board', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Board.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Board;