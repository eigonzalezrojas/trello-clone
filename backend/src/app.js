require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const app = express();
const sequelize = require('./sequelize');
const tempUserSession = require('./middleware/tempUserSession');
const createDefaultBoards = require('./middleware/defaultBoards');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

app.use(session({
  store: new pgSession({
    pool: sequelize.connectionManager.pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora de duración de la cookie
}));

// Middleware de usuario temporal
app.use(tempUserSession);

// Middleware para crear los tableros predeterminados
app.use(createDefaultBoards); 

// Rutas de tableros
app.use('/api', boardRoutes);

// Rutas de tareas
app.use('/api', taskRoutes);

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