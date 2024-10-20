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

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión con la base de datos establecida');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize;