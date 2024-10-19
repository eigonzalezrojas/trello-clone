const express = require('express');
const app = express();
const sequelize = require('./sequelize');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Rutas de tableros
app.use('/api', boardRoutes);

// Rutas de tareas
app.use('/api', taskRoutes);

// Rutas de usuarios
app.use('/api', userRoutes);

// Sincronizar modelos con la base de datos y luego iniciar el servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexión con la base de datos establecida y modelos sincronizados');
    
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });