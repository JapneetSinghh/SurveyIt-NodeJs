// Importing express
const express = require('express');
const homeController = require('../Controllers/home');
const router = express.Router();
const { check, body } = require('express-validator/check');

// Adding authentication middelwear
const isAuth = require('../middelwear/isAuth');


router.get('/', homeController.getHome);
router.get('/dashboard', isAuth, homeController.getDashboard)
router.post('/searchSurvey', [
    body('searchSurvey').custom((value) => {
        if (value === '') {
            throw new Error(`Please enter your first name`);
        }
        return true;
    })
], homeController.postSearchSurvey);
router.get('/searchSurvey/:searchSurvey', homeController.getSearchSurvey);
exports.router = router;