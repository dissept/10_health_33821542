
const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController');
const CycleController = require('../controllers/CycleController');

router.get('/', MainController.home);
router.get('/about', MainController.about);
router.get('/dashboard', CycleController.dashboard);

module.exports = router;
