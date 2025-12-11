
const Workout = require('../models/Workout');

module.exports = {
  searchForm: async (req, res) => {
    const term = req.query.q || '';
    let results = [];
    if (term.trim() !== '') {
      results = await Workout.search(term);
    }
    res.render('search', {
      title: 'Search workouts',
      term,
      results
    });
  }
};
