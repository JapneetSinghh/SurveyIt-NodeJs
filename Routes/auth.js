const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth');
router.get('/login', (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login | Survey It',
        path: "/login"
    })
})
router.get('/signup', (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up | Survey It',
        path: "/SignUp"
    })
})

router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.post('/signup', authController.postSignup);
exports.router = router;
