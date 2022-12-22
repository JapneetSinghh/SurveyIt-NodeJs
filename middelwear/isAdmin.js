module.exports = (req, res, next) => {
    if (req.session.user.userType !== 'admin') {
        req.flash('error', 'Unauthorised Access');
        req.flash('className', 'errorFlash');
        return res.redirect('/login');
    } else {
        console.log('admin access');
    }
    next();
}