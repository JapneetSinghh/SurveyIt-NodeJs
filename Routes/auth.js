const express = require('express');
const router = express.Router();
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
exports.router = router;
