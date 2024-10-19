const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('trello_db', 'admin', 'admin', {
  host: 'db',
  dialect: 'postgres',
});

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión con la base de datos establecida');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize;