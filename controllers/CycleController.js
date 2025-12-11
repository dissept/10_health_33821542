
const Cycle = require('../models/Cycle');

function getPhase(dayInCycle) {
  if (dayInCycle <= 4) return 'Menstrual';
  if (dayInCycle <= 11) return 'Follicular';
  if (dayInCycle <= 16) return 'Ovulation';
  return 'Luteal';
}

function getExercises(phase) {
  switch (phase) {
    case 'Menstrual':
      return ['Gentle yoga + stretching', 'Slow walks', 'Breathing & relaxation'];
    case 'Follicular':
      return ['Strength training (light to moderate)', 'Dance cardio', 'Easy runs'];
    case 'Ovulation':
      return ['HIIT (short + intense)', 'Heavier strength training', 'Spin / cycling'];
    case 'Luteal':
    default:
      return ['Pilates or barre', 'Low-impact cardio', 'Moderate strength sessions'];
  }
}

module.exports = {
  dashboard: async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const history = await Cycle.findByUser(req.session.user.id);
    res.render('dashboard', {
      title: 'Dashboard',
      history
    });
  },

  periodForm: (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    res.render('period-sync', {
      title: 'Sync your cycle',
      result: null
    });
  },

  calculate: async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const { lastPeriodDate, cycleLength } = req.body;
    const today = new Date();
    const start = new Date(lastPeriodDate);
    const diffMs = today - start;
    const daysSince = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const cycle = parseInt(cycleLength, 10) || 28;
    const dayInCycle = ((daysSince % cycle) + cycle) % cycle;

    const phase = getPhase(dayInCycle);
    const exercises = getExercises(phase);

    await Cycle.log(req.session.user.id, lastPeriodDate, cycleLength, phase);

    res.render('period-sync', {
      title: 'Sync your cycle',
      result: { dayInCycle, phase, exercises, cycleLength, lastPeriodDate }
    });
  }
};
