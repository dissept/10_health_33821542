
module.exports = {
  home: (req, res) => {
    res.render('home', { title: 'GlowCycle – Home' });
  },

  about: (req, res) => {
    res.render('about', { title: 'About GlowCycle' });
  }
};
