const express = require('express');
const surveyController = require('../Controllers/survey');
const router = express.Router();
// Adding authentication middelwear
const isAuth = require('../middelwear/isAuth');

router.get('/newSurvey', isAuth, surveyController.getNewSurvey);
router.post('/newSurvey', isAuth, surveyController.postNewSurvey);
router.get('/surveys', isAuth, surveyController.getAllSurveys);
router.get('/editSurvey/:surveyId', isAuth, surveyController.getEditSurvey);
router.post('/editSurvey', isAuth, surveyController.postEditSurvey);
router.post('/deleteSurvey/:surveyId', isAuth, surveyController.postDeleteSurvey);
router.get('/viewSurvey/:surveyId', isAuth, surveyController.getViewSurvey);
router.get('/shareSurvey/:surveyId', isAuth, surveyController.getShareSurvey);
exports.router = router;
