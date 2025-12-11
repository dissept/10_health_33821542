
const express = require('express');
const router = express.Router();
const CycleController = require('../controllers/CycleController');

router.get('/period-sync', CycleController.periodForm);
router.post('/period-sync', CycleController.calculate);

module.exports = router;
