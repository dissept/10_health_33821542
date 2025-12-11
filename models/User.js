
const db = require('./db');

module.exports = {
  create: (username, email, password) => {
    return db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
  },

  findByEmail: (email) => {
    return db
      .execute('SELECT * FROM users WHERE email = ?', [email])
      .then(([rows]) => rows[0]);
  },

  findByUsername: (username) => {
    return db
      .execute('SELECT * FROM users WHERE username = ?', [username])
      .then(([rows]) => rows[0]);
  }
};
