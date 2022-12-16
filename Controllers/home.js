const Survey = require('../Models/survey');

exports.getHome = (req, res, next) => {
    Survey.find()
        .then(surveys => {
            console.log(surveys);
            const obj = [];
            surveys.forEach(survey => {
                if (survey.shareGlobally === 'Yes') {
                    var surveyData = {
                        author: survey.author,
                        description: survey.description,
                        surveyName: survey.name,
                        thumbnailImage: survey.thumbnailImage,
                        dateCreated: survey.dateCreated,
                        numOfResponses: survey.responses.length,
                        surveyId: survey._id,
                        acceptingResponses: survey.acceptingResponses,
                        lastUpdated: survey.lastUpdated
                    }
                    obj.push(surveyData);
                }
            })
            return obj;
        })
        .then(surveys => {
            console.log(surveys);
            res.render('Home/index', {
                pageTitle: "SurveyIt | Home",
                path: "/home",
                surveys: surveys
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getDashboard = (req, res, next) => {
    console.log(req.user);
    Survey.find({ userId: req.user._id })
        .then(survey => {
            res.render('Dashboard/dashboard.ejs', {
                pageTitle: "SurveyIt | Home",
                path: "/dashboard",
                surveys: survey.reverse()
            })
        })
}

