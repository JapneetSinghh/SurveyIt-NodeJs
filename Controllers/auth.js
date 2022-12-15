const User = require('../Models/users');
const bcrypt = require('bcryptjs');
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('Email not found')
                return res.redirect('/login');
            }
            console.log('Email found')
            bcrypt.compare(password, user.password)
                .then(domatch => {
                    console.log("password match: " + domatch);
                    if (!domatch) {
                        console.log('Incorrect Password for ' + email);
                        return res.redirect('/login');
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
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
        console.log('Logout');
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    User.findOne({ email: email })
        .then(userCheck => {
            if (userCheck) {
                console.log('email exists');
                return res.redirect('/signup');
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashedPassword
                    })
                    user.save();
                    console.log('Account Created');
                    return res.redirect('/login');
                })
        })
}

