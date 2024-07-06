// backend/routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/data', dataController.getAllData);

module.exports = router;
