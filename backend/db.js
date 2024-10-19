const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'db',
  database: 'trello_db',
  password: 'admin',
  port: 5432,
});

module.exports = pool;