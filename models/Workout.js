
const db = require('./db');

module.exports = {
  search: (term) => {
    const q = `%${term}%`;
    return db
      .execute(
        'SELECT * FROM workouts WHERE name LIKE ? OR phase LIKE ? ORDER BY phase, name',
        [q, q]
      )
      .then(([rows]) => rows);
  },

  all: () => {
    return db
      .execute('SELECT * FROM workouts ORDER BY phase, name')
      .then(([rows]) => rows);
  }
};
