const Users = require('../Models/users');
const Surveys = require('../Models/survey');
const { response } = require('express');
const { Result } = require('express-validator');
exports.getAllUsers = (req, res, next) => {
    Users.find()
        .then(users => {
            return res.render('Dashboard/users', {
                pageTitle: 'SurveyIt | Users',
                path: '/admin/users',
                users: users
            })
        })
}
exports.getUserDetails = (req, res, next) => {
    userId = req.params.userId;
    var userDetail = null;
    Users.findById(userId)
        .then(user => {
            userDetail = user;
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
    // Surveys.find({ userId: userId }, function (err, surveys) {
    //     if (surveys) {
    //         console.log(surveys);
    //         surveys.remove();
    //     }
    // })
    Surveys.deleteMany({ userId: userId })
        .then(result => {
            console.log(result);
            res.redirect('/admin/users');
        })
        .catch(err => {
            console.log(err);
        })
}