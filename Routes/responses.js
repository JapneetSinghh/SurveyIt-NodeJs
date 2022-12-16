const express = require('express');
const router = express.Router();
const responseController = require('../Controllers/responses');
// Adding authentication middelwear
const isAuth = require('../middelwear/isAuth');

router.post('/postResponse', responseController.postNewResponse);
router.get('/getSurvey/:surveyName/:surveyId', responseController.getSurvey);
router.get('/responses', isAuth, responseController.getResponses);
router.get('/getResponse/:surveyId', isAuth, responseController.getFullResponse);
router.get('/viewUserResponse/:surveyId/:num/:username', isAuth, responseController.getUserResponse);
router.post('/deleteSurveyResponse/:surveyId/:num/:username', isAuth, responseController.deleteResponse);

exports.router = router;