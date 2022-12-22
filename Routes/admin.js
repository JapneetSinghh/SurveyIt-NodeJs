const isAuth = require('../middelwear/isAuth');
const isAdmin = require('../middelwear/isAdmin');
const express = require('express');
const { check, body } = require('express-validator/check');

const router = express.Router();
const adminController = require('../Controllers/admin');
router.get('/users', isAuth, isAdmin, adminController.getAllUsers);
router.get('/userDetails/:userId', isAuth, isAdmin, adminController.getUserDetails);
router.get('/allSurveys', isAuth, isAdmin, adminController.getAllSurveys);
router.post('/deleteUser/:userId', isAuth, isAdmin, adminController.deleteUser);
router.post('/searchSurvey', isAuth, isAdmin, [
    body('searchSurvey').custom((value) => {
        if (value === '') {
            throw new Error(`Search field can't be empty`);
        }
        return true;
    })
], adminController.postSearchSurvey);

router.post('/searchUser', [
    body('searchUser')
        .custom(value => {
            if (value === '') {
                throw new Error(`Search field can't be empty`);
            }
            return true;
        })
],
    adminController.postSearchUser);
exports.router = router;
