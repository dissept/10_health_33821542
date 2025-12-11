const express = require('express');
const session = require('express-session');
const path = require('path');
const MySQLStore = require('express-mysql-session')(session);

const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const cycleRoutes = require('./routes/cycle');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = 8000;

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static + body parser
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// session store (MySQL)
const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'berties_books_app',
  password: 'glowpass',
  database: 'glowcycle'
});
app.use(
  session({
    key: 'glowcycle_sid',
    secret: 'supersecretkey',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
  })
);

// make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// routes
app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/', cycleRoutes);
app.use('/', searchRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('simple', {
    title: 'Not found',
    heading: 'Page not found',
    message: 'The page you are looking for does not exist.'
  });
});

app.listen(PORT, () => {
  console.log(`GlowCycle server running on http://localhost:${PORT}`);
});
