const survey = require('../Models/survey');
const Survey = require('../Models/survey');
exports.postNewResponse = (req, res, next) => {
    console.log(req.body);
}
exports.getSurvey = (req, res, next) => {
    const surveyId = req.params.surveyId;
    const surveyName = req.params.surveyName;
    Survey.findOne({ _id: surveyId, name: surveyName })
        .then(survey => {
            // console.log(survey);
            res.render('shareSurvey/survey', {
                pageTitle: `SurveyIt | ${survey.name}`,
                path: "",
                editMode: false,
                viewMode: true,
                survey: survey,
                data: null
            })
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getResponses = (req, res, next) => {
    res.render('Dashboard/responses', {
        pageTitle: 'Survey It | Responses',
        path: "/responses"
    });
}
exports.getFullResponse = (req, res, next) => {
    res.render('Dashboard/fullResponse', {
        pageTitle: 'Survey It | Responses',
        path: "/responses"
    });
}