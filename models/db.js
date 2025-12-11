
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'berties_books_app',
  password: 'glowpass',
  database: 'glowcycle'
});

module.exports = pool;