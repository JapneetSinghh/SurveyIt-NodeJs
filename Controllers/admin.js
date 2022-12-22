const Users = require('../Models/users');
const Surveys = require('../Models/survey');
const { validationResult } = require('express-validator/check');

const { response } = require('express');
exports.getAllUsers = (req, res, next) => {
    Users.find()
        .then(users => {
            return res.render('Dashboard/users', {
                pageTitle: 'SurveyIt | Users',
                path: '/admin/users',
                users: users,
                searchUser: ''
            })
        })
}
exports.getUserDetails = (req, res, next) => {
    userId = req.params.userId;
    var userDetail = null;
    Users.findById(userId)
        .then(user => {
            userDetail = user;
            console.log(user);
            return user;
        }).then(response => {
            Surveys.find({ userId: userId })
                .then(surveys => {
                    return res.render('Dashboard/userDetails', {
                        pageTitle: 'SurveyIt | Users',
                        path: '/admin/users',
                        user: userDetail,
                        surveys: surveys
                    })
                })
        })
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    Users.findByIdAndDelete(userId)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    Surveys.deleteMany({ userId: userId })
        .then(result => {
            console.log(result);
            res.redirect('/admin/users');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getAllSurveys = (req, res, next) => {
    Surveys.find()
        .then(surveys => {
            res.render('Dashboard/surveys', {
                pageTitle: "SurveyIt | All",
                path: "/admin/allSurveys",
                surveys: surveys.reverse(),
                searchSurvey: ''
            })
        })
}

exports.postSearchSurvey = (req, res, next) => {
    const searchSurvey = req.body.searchSurvey;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', `Search field can't be empty`);
        return res.redirect('/admin/allSurveys');
    }
    Surveys.find(
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

        }).then(surveys => {
            if (!surveys) {
                return res.redirect('/admin/allSurveys');
            }
            res.render('Dashboard/surveys', {
                pageTitle: "SurveyIt | All",
                path: "/admin/allSurveys",
                surveys: surveys.reverse(),
                searchSurvey: searchSurvey
            })
        })
}


exports.postSearchUser = (req, res, next) => {
    searchUser = req.body.searchUser;
    Users.find({
        $or: [
            {
                firstName: {
                    $regex: searchUser, $options: "i",
                }
            },
            {
                lastName: {
                    $regex: searchUser, $options: "i",
                }
            },
            {
                email: {
                    $regex: searchUser, $options: "i",
                }
            },
        ]
    }
    )
        .then(users => {
            return res.render('Dashboard/users', {
                pageTitle: 'SurveyIt | Users',
                path: '/admin/users',
                users: users,
                searchUser: searchUser
            })
        })
}