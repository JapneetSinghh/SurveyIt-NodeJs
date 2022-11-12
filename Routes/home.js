// Importing express
const express = require('express');
const homeController = require('../Controllers/home');
const router = express.Router();

router.get('/', homeController.getHome);
router.get('/dashboard', homeController.getDashboard)

exports.router = router;