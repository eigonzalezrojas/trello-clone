const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TempUser = sequelize.define('TempUser', {
    session_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'temp_users',
    timestamps: false
});

module.exports = TempUser;