const express = require('express');
const router = express.Router();
const { getServices, getServiceById, getServiceBySlug } = require('../controllers/serviceController');

router.route('/').get(getServices);
router.route('/slug/:slug').get(getServiceBySlug);
router.route('/:id').get(getServiceById);

module.exports = router;
