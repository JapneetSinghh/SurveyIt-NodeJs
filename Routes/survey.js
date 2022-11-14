const express = require('express');
const surveyController = require('../Controllers/survey');
const router = express.Router();

router.get('/newSurvey', surveyController.getNewSurvey);
router.post('/newSurvey', surveyController.postNewSurvey);
router.get('/surveys', surveyController.getAllSurveys);
router.get('/editSurvey/:surveyId', surveyController.getEditSurvey);
router.post('/editSurvey', surveyController.postEditSurvey);
router.post('/deleteSurvey/:surveyId', surveyController.postDeleteSurvey);
router.get('/viewSurvey/:surveyId', surveyController.getViewSurvey);
router.get('/shareSurvey/:surveyId', surveyController.getShareSurvey);
exports.router = router;
