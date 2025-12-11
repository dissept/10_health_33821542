
const db = require('./db');

module.exports = {
  log: (userId, lastPeriod, cycleLength, phase) => {
    return db.execute(
      'INSERT INTO cycles (user_id, last_period, cycle_length, phase) VALUES (?, ?, ?, ?)',
      [userId, lastPeriod, cycleLength, phase]
    );
  },

  findByUser: (userId) => {
    return db
      .execute(
        'SELECT * FROM cycles WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      )
      .then(([rows]) => rows);
  }
};
