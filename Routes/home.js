// Importing express
const express = require('express');
const homeController = require('../Controllers/home');
const router = express.Router();
// Adding authentication middelwear
const isAuth = require('../middelwear/isAuth');

router.get('/', homeController.getHome);
router.get('/dashboard', isAuth, homeController.getDashboard)

exports.router = router;