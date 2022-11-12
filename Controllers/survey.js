const Survey = require('../Models/survey');
const formFunctions = require('./forms');
exports.getNewSurvey = (req, res, next) => {
    console.log("New Survey");
    res.render('Dashboard/newSurvey', {
        pageTitle: "SurveyIt | New Survey",
        path: "/surveys",
        editMode: false,
        viewMode: false,
        survey: []
    })
}
// adding new survey
exports.postNewSurvey = (req, res, next) => {
    // GETTING SURVEY DETAILS
    const thumbnailImage = req.body.thumbnailImage; // 0
    const acceptingResponses = req.body.acceptingResponses; // 1
    const shareGloabally = req.body.shareGloabally; // 2
    const surveyName = `${req.body.question_0}`; // 3
    const surveyDescription = `${req.body.question_0_description}`; // 4
    const date = new Date();
    var dateCreated = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`; // 5
    const numOfQues = req.body.questionNumber.length; // 6
    var lastUpdated = dateCreated; // 7
    const questionsData = []; // 8
    const userId = req.user._id; // 9

    console.log(req.body);
    // GETTING  DETAILS OF EVERY QUESTION
    for (var i = 1; i < numOfQues; i++) {
        var questionNumber = i;
        var questionType = req.body[`question_${i}_type`];
        var question = req.body[`question_${i}`];
        var questionDescription = req.body[`question_${i}_description`];
        var isRequired = req.body[`question_${i}_required`];

        if (questionType === 'MCQ') {
            var correctOption = req.body[`question_${i}_correct_option`]
            var numOfOptions = req.body[`question_${i}_number_of_options`];
            var options = [];
            var serialCharNum = 65;
            for (var j = 1; j <= numOfOptions; j++) {
                var serial = String.fromCharCode(serialCharNum);
                serialCharNum++;
                options.push(
                    {
                        serial: serial,
                        option: req.body[`question_${i}_option_${j}`]
                    }
                )
            }
            // ADDING QUESTION DATA TO AN OBJECT OBJ, IF QUESTION TYPE IS MCQ ADDING OPTIONS TO OBJ
            var obj = {
                questionNumber: questionNumber,
                type: questionType,
                question: question,
                isRequired: isRequired,
                numberOfOptions: numOfOptions,
                options: options,
                correctOption: correctOption,
            }
        } else {
            var obj = {
                questionNumber: questionNumber,
                type: questionType,
                question: question,
                questionDescription: questionDescription,
                isRequired: isRequired,
            }
        }
        questionsData.push(obj);
    }
    console.log('Posting Your Survey');
    const survey = new Survey({
        userId: userId,
        name: surveyName,
        acceptingResponses: acceptingResponses,
        shareGlobally: shareGloabally,
        description: surveyDescription,
        thumbnailImage: thumbnailImage,
        dateCreated: dateCreated,
        lastUpdated: lastUpdated,
        numOfQues: numOfQues - 1,
        questionsData: questionsData
    });
    console.log("Desc" + surveyDescription);
    survey.save()
        .then(result => {
            console.log(result);
            console.log('SURVEY SUBMITTED')
            res.redirect('/surveys');
        }).catch(err => {
            console.log(err);
        })
}

exports.getAllSurveys = (req, res, next) => {
    console.log("Getting Dashboard");
    const userId = req.user._id;
    Survey.find({ userId: userId })
        .then(survey => {
            // console.log(survey);
            res.render('Dashboard/surveys', {
                pageTitle: "SurveyIt | All",
                path: "/surveys",
                surveys: survey
            })
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getEditSurvey = (req, res, next) => {
    const surveyId = req.params.surveyId;
    Survey.findById(surveyId)
        .then(survey => {
            console.log(survey);
            res.render('Dashboard/editSurvey', {
                pageTitle: "SurveyIt |  Edit Survey",
                path: "",
                editMode: true,
                viewMode: false,
                survey: survey,
                helper: formFunctions
            })
        })
}
exports.postEditSurvey = (req, res, next) => {
    const thumbnailImage = req.body.thumbnailImage;
    const acceptingResponses = req.body.acceptingResponses;
    const shareGloabally = req.body.shareGloabally;
    const surveyName = `${req.body.question_0}`;
    const surveyDescription = `${req.body.question_0_description}`;
    const date = new Date();
    var dateCreated = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    const numOfQues = req.body.questionNumber.length;
    var lastUpdated = dateCreated;
    const questionsData = [];
    const userId = req.user._id;
    console.log(req.body);
    // GETTING  DETAILS OF EVERY QUESTION
    for (var i = 1; i < numOfQues; i++) {
        var questionNumber = i;
        var questionType = req.body[`question_${i}_type`];
        var question = req.body[`question_${i}`];
        var questionDescription = req.body[`question_${i}_description`];
        var isRequired = req.body[`question_${i}_required`];

        if (questionType === 'MCQ') {
            var correctOption = req.body[`question_${i}_correct_option`]
            var numOfOptions = req.body[`question_${i}_number_of_options`];
            var options = [];
            var serialCharNum = 65;
            for (var j = 1; j <= numOfOptions; j++) {
                var serial = String.fromCharCode(serialCharNum);
                serialCharNum++;
                options.push(
                    {
                        serial: serial,
                        option: req.body[`question_${i}_option_${j}`]
                    }
                )
            }
            // ADDING QUESTION DATA TO AN OBJECT OBJ, IF QUESTION TYPE IS MCQ ADDING OPTIONS TO OBJ
            var obj = {
                questionNumber: questionNumber,
                type: questionType,
                question: question,
                isRequired: isRequired,
                numberOfOptions: numOfOptions,
                options: options,
                correctOption: correctOption,
            }
        } else {
            var obj = {
                questionNumber: questionNumber,
                type: questionType,
                question: question,
                questionDescription: questionDescription,
                isRequired: isRequired,
            }
        }
        questionsData.push(obj);
    }
    const surveyId = req.body.surveyId;
    Survey.findById(surveyId)
        .then(survey => {
            survey.userId = userId;
            survey.name = surveyName;
            survey.acceptingResponses = acceptingResponses;
            survey.shareGlobally = shareGloabally;
            survey.description = surveyDescription;
            survey.thumbnailImage = thumbnailImage;
            survey.lastUpdated = lastUpdated;
            survey.numOfQues = numOfQues - 1;
            survey.questionsData = questionsData;
            survey.save()
                .then(result => {
                    console.log('Survey Updated');
                    console.log(result);
                    res.redirect('/surveys');
                })
        })
        .catch(err => {
            console.log('survey not found');
            console.log(err);
        });
}

exports.postDeleteSurvey = (req, res, next) => {
    const surveyId = req.params.surveyId;
    Survey.deleteOne({ _id: surveyId })
        .then(result => {
            console.log(result);
            console.log('Survey Deleted');
            res.redirect('/surveys');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getViewSurvey = (req, res, next) => {
    const surveyId = req.params.surveyId;
    console.log('view survey');
    Survey.findById(surveyId)
        .then(survey => {
            // console.log(survey);
            res.render('Dashboard/viewSurvey', {
                pageTitle: "SurveyIt | View Survey",
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

exports.getShareSurvey = (req, res, next) => {
    const surveyId = req.params.surveyId;
    Survey.findById(surveyId)
        .then(survey => {
            // console.log(survey);
            res.render('Dashboard/shareSurvey', {
                pageTitle: "SurveyIt | Share Survey",
                path: "",
                survey: survey,
                hostname: req.hostname
            })
        })
        .catch(err => {
            console.log(err);
        })
}