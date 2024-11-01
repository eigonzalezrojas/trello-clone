const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const sequelize = require('./sequelize');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');
const tempUserSession = require('./middleware/tempUserSession');

const app = express();

const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const pgPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'sessions',
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000, sameSite: 'lax'},
}));

app.use(express.json());
app.use(tempUserSession);

// Routes of the boards
app.use('/api', boardRoutes);

// Routes of the tasks
app.use('/api', taskRoutes);

// Sincronización de la base de datos y servidor
sequelize.sync({ alter: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });