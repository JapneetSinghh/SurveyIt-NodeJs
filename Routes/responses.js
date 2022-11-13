const express = require('express');
const router = express.Router();
const responseController = require('../Controllers/responses');

router.post('/postResponse', responseController.postNewResponse);
router.get('/getSurvey/:surveyName/:surveyId', responseController.getSurvey);
router.get('/responses', responseController.getResponses);
router.get('/getResponse/:surveyId', responseController.getFullResponse);
router.get('/viewUserResponse/:surveyId/:num/:username', responseController.getUserResponse);
router.post('/deleteSurveyResponse/:surveyId/:num/:username', responseController.deleteResponse);

exports.router = router;