const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const TempUser = require('./TempUser');

const Board = sequelize.define('Board', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'boards',
  timestamps: false,
});

Board.belongsTo(TempUser, { foreignKey: 'owner_id', onDelete: 'CASCADE' });

module.exports = Board;