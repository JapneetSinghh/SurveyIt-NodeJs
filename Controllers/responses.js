const Survey = require('../Models/survey');
const Response = require('../Models/responses');
const { response } = require('express');

// exports.postNewResponse = (req, res, next) => {
//     // FETCHING DATA FROM BODY
//     const surveyId = req.body.surveyId;
//     const questionsData = [];
//     const numOfQues = req.body.questionNumber.length;
//     const username = req.body.userName;
//     const email = req.body.userEmail;
//     // FETCHING QUESTIONS , ANSWERS, QUESTION TYPE ETC 
//     for (var i = 1; i < numOfQues; i++) {
//         var questionNumber = i;
//         var questionType = req.body[`question_${i}_type`];
//         var question = req.body[`question_${i}`];
//         var questionDescription = req.body[`question_${i}_description`];
//         var isRequired = req.body[`question_${i}_required`];
//         var answer = req.body[`question_${i}_answer`]
//         if (!questionDescription) {
//             questionDescription = '';
//         }

//         if (questionType === 'MCQ') {
//             var correctOption = '';
//             var numOfOptions = req.body[`question_${i}_number_of_options`];
//             var options = [];
//             var serialCharNum = 65;
//             for (var j = 1; j <= numOfOptions; j++) {
//                 var serial = String.fromCharCode(serialCharNum);
//                 serialCharNum++;
//                 options.push(
//                     {
//                         serial: serial,
//                         option: req.body[`question_${i}_option_${j}`]
//                     }
//                 )
//             }
//             // ADDING QUESTION DATA TO AN OBJECT OBJ, 
//             // IF QUESTION TYPE IS MCQ ADDING OPTIONS TO OBJ
//             var obj = {
//                 questionNumber: questionNumber,
//                 type: questionType,
//                 question: question,
//                 isRequired: isRequired,
//                 correctOption: correctOption,
//                 numberOfOptions: numOfOptions,
//                 options: options,
//                 answer: answer
//             }
//         } else {
//             var obj = {
//                 questionNumber: questionNumber,
//                 type: questionType,
//                 question: question,
//                 questionDescription: questionDescription,
//                 isRequired: isRequired,
//                 answer: answer
//             }
//         }
//         questionsData.push(obj);
//     }

//     // SETTING THE CORRECT OPTIONS FROM SURVEY
//     // NOT CORRECT OPTIONS WERE NOT INCLUDED IN BODY AS WE DONT WANT OUR USERS TO VIEW THEM 

//     function setOptions(questionSurvey, i) {
//         questionsData.forEach((questionResponse, index) => {
//             if (questionResponse.type === 'MCQ' && index === i) {
//                 questionResponse.correctOption = questionSurvey.correctOption;
//             }
//         })
//     }
//     // PROMISE FOR SETTING OPTIONS
//     const myPromise = new Promise((resolve, reject) => {
//         Survey.findById(surveyId)
//             .then(data => {
//                 data.questionsData.forEach((questionSurvey, index) => {
//                     if (questionSurvey.type === 'MCQ') {
//                         setOptions(questionSurvey, index);
//                     }
//                 })
//                 setTimeout(() => {
//                     resolve();
//                     reject();
//                 }, 2000)
//             })
//     })
//     myPromise.then(resp => {
//         // Saving the response
//         const response = new Response({
//             username: username,
//             email: email,
//             questionsData: questionsData,
//             surveyId: surveyId
//         });
//         response.save().then(result => {
//             console.log(result);
//             res.redirect('/');
//         })
//             .catch(err => {
//                 console.log(err);
//             })
//     })
//         .catch(err => {
//             console.log(err);
//         })

// }

exports.postNewResponse = (req, res, next) => {
    const surveyId = req.body.surveyId;
    Survey.findById(surveyId)
        .then(survey => {
            if (survey.acceptingResponses !== 'Yes') {
                return res.render('responsepages', {
                    pageTitle: 'Form Closed | SurveyIt',
                    pageType: 'notAccepting'
                })
            }
            const questionsData = [];
            const numOfQues = req.body.questionNumber.length;
            const username = req.body.userName;
            const email = req.body.userEmail;
            // Dare and time 
            const date2 = new Date();
            var dateNow = `${date2.getDate()} ${date2.toLocaleString('default', { month: 'short' })} ${date2.getFullYear()}`;
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;

            var time = strTime;

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
                const response = {
                    username: username,
                    email: email,
                    questionsData: questionsData,
                    surveyId: surveyId,
                    date: dateNow,
                    time: time
                };
                return response;
            }).then(response => {
                survey.responses.push(response);
                console.log(survey.responses);
                survey.save();
                res.render('responsepages', {
                    pageTitle: 'Survey Submitted | SurveyIt',
                    pageType: 'surveySubmitted'
                });
            })
                .catch(err => {
                    console.log(err);
                })

        })
}
exports.getSurvey = (req, res, next) => {
    const surveyId = req.params.surveyId;
    const surveyName = req.params.surveyName;
    Survey.findOne({ _id: surveyId, name: surveyName })
        .then(survey => {
            if (survey.acceptingResponses !== 'Yes') {
                console.log('form closed')
                return res.render('responsepages', {
                    pageTitle: 'Form Closed | SurveyIt',
                    pageType: 'notAccepting'
                })
            }
            // console.log(survey);
            res.render('shareSurvey/survey', {
                pageTitle: `SurveyIt | ${survey.name}`,
                path: "",
                editMode: false,
                viewMode: true,
                survey: survey,
                data: null,
                responseMode: false,
                surveyData: ''
            })
        })
        .catch(err => {
            console.log(err);
        })
}


exports.getResponses = (req, res, next) => {
    const surveyData = []
    Survey.find({ userId: req.user._id })
        .then(surveys => {
            res.render('Dashboard/responses', {
                pageTitle: 'Survey It | Responses',
                path: "/responses",
                surveys: surveys,
                pageType: 'allSurveys'
            });
        })
}


exports.getFullResponse = (req, res, next) => {
    const surveyId = req.params.surveyId;
    Survey.findById(surveyId)
        .then(survey => {
            res.render('Dashboard/responses', {
                pageTitle: 'Survey It | Responses',
                path: "/responses",
                pageType: 'oneSurvey',
                survey: survey
            });
        })
}

exports.getUserResponse = (req, res, next) => {
    const surveyId = req.params.surveyId;
    const userName = req.params.username;
    var Response = null;
    var surveyData = '';
    Survey.findById(surveyId)
        .then(survey => {
            if (req.user._id.toString() !== survey.userId.toString()) {
                return res.redirect('/404');
            }
            surveyData = survey
            const responses = survey.responses;
            survey.responses.forEach((response) => {
                if (response.username === userName) {
                    Response = response;
                }
            })
            return Response;
        }).then(response => {
            if (response) {
                console.log(response);
                res.render('Dashboard/viewSurvey', {
                    pageTitle: "SurveyIt | View Survey",
                    path: "",
                    editMode: false,
                    viewMode: false,
                    responseMode: true,
                    survey: response,
                    surveyData: surveyData,
                    data: null
                })
            } else {
                console.log('not found');
            }
        })
        .catch(err => {
            res.redirect('/login');
        })

}

exports.deleteResponse = (req, res, next) => {
    const surveyId = req.params.surveyId;
    const num = req.params.num;
    const username = req.params.username;
    var responseIndex = 0;
    Survey.findById(surveyId)
        .then(survey => {
            survey.responses.forEach((response, index) => {
                if (username === response.username) {
                    responseIndex = index;
                    console.log(index);
                }
            })
            survey.responses[responseIndex];
            survey.responses = survey.responses.filter((_, index) => index !== responseIndex);
            survey.save().then(result => {
                res.redirect('/responses');
            });
        })
}