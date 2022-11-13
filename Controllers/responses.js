const Survey = require('../Models/survey');
const Response = require('../Models/responses');

exports.postNewResponse = (req, res, next) => {
    // FETCHING DATA FROM BODY
    const surveyId = req.body.surveyId;
    const questionsData = [];
    const numOfQues = req.body.questionNumber.length;
    const username = req.body.userName;
    const email = req.body.userEmail;
    // FETCHING QUESTIONS , ANSWERS, QUESTION TYPE ETC 
    for (var i = 1; i < numOfQues; i++) {
        var questionNumber = i;
        var questionType = req.body[`question_${i}_type`];
        var question = req.body[`question_${i}`];
        var questionDescription = req.body[`question_${i}_description`];
        var isRequired = req.body[`question_${i}_required`];
        var answer = req.body[`question_${i}_answer`]
        if (!questionDescription) {
            questionDescription = '';
        }

        if (questionType === 'MCQ') {
            var correctOption = '';
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
            // ADDING QUESTION DATA TO AN OBJECT OBJ, 
            // IF QUESTION TYPE IS MCQ ADDING OPTIONS TO OBJ
            var obj = {
                questionNumber: questionNumber,
                type: questionType,
                question: question,
                isRequired: isRequired,
                correctOption: correctOption,
                numberOfOptions: numOfOptions,
                options: options,
                answer: answer
            }
        } else {
            var obj = {
                questionNumber: questionNumber,
                type: questionType,
                question: question,
                questionDescription: questionDescription,
                isRequired: isRequired,
                answer: answer
            }
        }
        questionsData.push(obj);
    }

    // SETTING THE CORRECT OPTIONS FROM SURVEY
    // NOT CORRECT OPTIONS WERE NOT INCLUDED IN BODY AS WE DONT WANT OUR USERS TO VIEW THEM 

    function setOptions(questionSurvey, i) {
        questionsData.forEach((questionResponse, index) => {
            if (questionResponse.type === 'MCQ' && index === i) {
                questionResponse.correctOption = questionSurvey.correctOption;
            }
        })
    }
    // PROMISE FOR SETTING OPTIONS
    const myPromise = new Promise((resolve, reject) => {
        Survey.findById(surveyId)
            .then(data => {
                data.questionsData.forEach((questionSurvey, index) => {
                    if (questionSurvey.type === 'MCQ') {
                        setOptions(questionSurvey, index);
                    }
                })
                setTimeout(() => {
                    resolve();
                    reject();
                }, 2000)
            })
    })
    myPromise.then(resp => {
        // Saving the response
        const response = new Response({
            username: username,
            email: email,
            questionsData: questionsData,
            surveyId: surveyId
        });
        response.save().then(result => {
            console.log(result);
            res.redirect('/');
        })
            .catch(err => {
                console.log(err);
            })
    })
        .catch(err => {
            console.log(err);
        })

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

