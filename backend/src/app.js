require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const sequelize = require('./sequelize');
const tempUserSession = require('./middleware/tempUserSession');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

// Pool de conexiones 'pg' en lugar de Sequelize
const pgPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Configuración de express-session con connect-pg-simple
app.use(session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'sessions'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora de duración de la cookie
}));

// Middleware de usuario temporal
app.use(tempUserSession);

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