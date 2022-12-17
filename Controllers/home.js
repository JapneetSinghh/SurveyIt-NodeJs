const Survey = require('../Models/survey');
const { validationResult } = require('express-validator/check');

exports.getHome = (req, res, next) => {
    Survey.find()
        .then(surveys => {
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
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }

            return res.render('Home/index', {
                pageTitle: "SurveyIt | Home",
                path: "/home",
                surveys: surveys,
                message: message
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getDashboard = (req, res, next) => {
    Survey.find({ userId: req.user._id })
        .then(survey => {
            res.render('Dashboard/dashboard.ejs', {
                pageTitle: "SurveyIt | Home",
                path: "/dashboard",
                surveys: survey.reverse()
            })
        })
}


exports.postSearchSurvey = (req, res, next) => {
    const searchSurvey = req.body.searchSurvey;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', `Search field can't be empty`);
        return res.redirect('/');
    }
    res.redirect(`/searchSurvey/${searchSurvey}`);
}
exports.getSearchSurvey = (req, res, next) => {
    const searchSurvey = req.params.searchSurvey;
    Survey.find(
        {
            $or: [
                {
                    name: {
                        $regex: searchSurvey, $options: "i",
                    }
                },
                {
                    author: {
                        $regex: searchSurvey, $options: "i",
                    }
                },
                {
                    description: {
                        $regex: searchSurvey, $options: "i",
                    }
                },
            ],
            shareGlobally: "Yes"
        })
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
        }).then(surveys => {
            return res.render('Home/search', {
                pageTitle: "SurveyIt | Home",
                path: "/home",
                surveys: surveys,
                searchSurvey: searchSurvey
            })
        })
}