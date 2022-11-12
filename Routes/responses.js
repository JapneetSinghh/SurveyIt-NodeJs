const express = require('express');
const router = express.Router();
const responseController = require('../Controllers/responses');

router.post('/postResponse', responseController.postNewResponse);
router.get('/getSurvey/:surveyName/:surveyId', responseController.getSurvey);
exports.router = router;