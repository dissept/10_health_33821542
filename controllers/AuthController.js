
const User = require('../models/User');

module.exports = {
  registerForm: (req, res) => {
    res.render('register', { title: 'Join GlowCycle' });
  },

  register: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.render('register', {
        title: 'Join GlowCycle',
        error: 'Please fill in all fields.'
      });
    }

    try {
      await User.create(username, email, password);
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.render('register', {
        title: 'Join GlowCycle',
        error: 'Could not create user (maybe email already used?).'
      });
    }
  },

  loginForm: (req, res) => {
    res.render('login', { title: 'Login' });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.render('login', {
        title: 'Login',
        error: 'Please enter both username and password.'
      });
    }

    try {
      const user = await User.findByUsername(username);
      if (!user || user.password !== password) {
        return res.render('login', {
          title: 'Login',
          error: 'Invalid credentials.'
        });
      }

      req.session.user = { id: user.id, username: user.username };
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.render('login', {
        title: 'Login',
        error: 'Something went wrong, please try again.'
      });
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};
