const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const sequelize = require('./sequelize'); // Importing sequelize from sequelize.js
const tempUserSession = require('./middleware/tempUserSession');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// PostgreSQL session store setup
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
    tableName: 'sessions'
  }),
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1-hour expiry
}));

app.use(express.json());

// Temporary user session middleware
app.use(tempUserSession);

// Route declarations
app.use('/api', boardRoutes);
app.use('/api', taskRoutes);

// Sync models and start the server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connection established and models synchronized');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });