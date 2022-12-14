const User = require('../Models/users');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

exports.getLogin = (req, res, next) => {
    // USING FLASH() FOR SENDING RESPONSE TO USER 
    let message = req.flash('error');
    let className = req.flash('className');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        pageTitle: 'Login | Survey It',
        path: "/login",
        message: message,
        messageClass: className,
        email: '',
        password: ''
    })
}
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/login', {
            pageTitle: 'Login | Survey It',
            path: "/login",
            message: errors.array()[0].msg,
            messageClass: 'errorFlash',
            email: email,
            password: password
        });
    }

    console.log(email);
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                // console.log('Email not found')
                req.flash('error', 'Incorrect Email');
                req.flash('className', 'errorFlash');
                return res.render('auth/login', {
                    pageTitle: 'Login | Survey It',
                    path: "/login",
                    message: 'Incorrect Email',
                    messageClass: 'errorFlash',
                    email: email,
                    password: password
                });
            }
            // console.log('Email found')
            bcrypt.compare(password, user.password)
                .then(domatch => {
                    // console.log("password match: " + domatch);
                    if (!domatch) {
                        // console.log('Incorrect Password for ' + email);
                        req.flash('error', 'Incorrect Email or Password');
                        req.flash('className', 'errorFlash');
                        return res.render('auth/login', {
                            pageTitle: 'Login | Survey It',
                            path: "/login",
                            message: 'Incorrect Email or Password',
                            messageClass: 'errorFlash',
                            email: email,
                            password: password
                        });
                    }
                    console.log('Vaild Password');
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    console.log('Req.session.user ' + req.session.user);
                    // console.log(req.session);
                    req.session.save();
                    res.redirect('/dashboard');
                    console.log('Logged in');
                })
        })
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
}

exports.postLogout = (req, res, next) => {
    req.flash('error', 'Logged out successfully');
    req.flash('className', 'successFlash');
    req.session.destroy(err => {
        console.log(err);
        return res.redirect('/login');
    })
}
exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up | Survey It',
        path: "/SignUp",
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: null
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('auth/signup', {
            pageTitle: 'Sign Up | Survey It',
            path: "/SignUp",
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            message: errors.array()[0].msg
        });
    }

    User.findOne({ email: email })
        .then(userCheck => {
            if (userCheck) {
                console.log('email exists');

                return res.render('auth/signup', {
                    pageTitle: 'Sign Up | Survey It',
                    path: "/SignUp",
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    message: 'Account with this email already exists'
                });
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {

                    // Date and time 
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
                    console.log(time, dateNow);

                    const user = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashedPassword,
                        userType: 'user',
                        dateCreated: dateNow,
                        timeCreated: time,
                        image: '/img/UserThumbnail.png'
                    })
                    user.save();
                    console.log('Account Created');
                    return res.render('auth/login', {
                        pageTitle: 'Login | Survey It',
                        path: "/login",
                        message: 'New Account created successfully',
                        messageClass: 'successFlash',
                        email: '',
                        password: ''
                    });
                })
        })
        .catch(err => {
            console.log(err);
        })
}

