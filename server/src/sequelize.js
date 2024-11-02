require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection established with the database');
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
  });

module.exports = sequelize;