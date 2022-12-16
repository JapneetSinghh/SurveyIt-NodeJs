const express = require('express');
const router = express.Router();
// IMPORTING EXPRESS VALIDATOR
const { check, body } = require('express-validator/check');

const authController = require('../Controllers/auth');
router.get('/login', authController.getLogin)
router.get('/signup', authController.getSignup)

router.post('/login', [
    body('email').isEmail().withMessage('Please Enter A Valid Email'),
    body('password', 'Please enter a valid password with at least 6 characters').isLength({ min: 6 }).isAlphanumeric()
]
    , authController.postLogin);
router.post('/logout', authController.postLogout);
router.post('/signup', [
    body('firstName').custom((value) => {
        if (value === '') {
            throw new Error(`Please enter your first name`);
        }
        return true;
    }),
    body('lastName').custom((value) => {
        if (value === '') {
            throw new Error(`Please enter your last name`);
        }
        return true;
    }),
    body('email').isEmail().withMessage('Please Enter A Valid Email'),
    body('password', 'Password must contain atleast 6 characters (letters or numbers)').isLength({ min: 6 }).isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            console.log(req.body.password);
            console.log(value)
            throw new Error('Passwords Have To Match');
        }
        return true;
    }),

], authController.postSignup);
exports.router = router;
