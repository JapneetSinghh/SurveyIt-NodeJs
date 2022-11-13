const express = require('express');
const router = express.Router();
const responseController = require('../Controllers/responses');

router.post('/postResponse', responseController.postNewResponse);
router.get('/getSurvey/:surveyName/:surveyId', responseController.getSurvey);
router.get('/responses', responseController.getResponses);
router.get('/getResponse', responseController.getFullResponse);


exports.router = router;