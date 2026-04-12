const express = require('express');
const router = express.Router();
const { getHomepageData, getBusinessInfo } = require('../controllers/aggregationController');

router.get('/homepage-data', getHomepageData);
router.get('/business-info', getBusinessInfo);

module.exports = router;
