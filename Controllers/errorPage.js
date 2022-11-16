
exports.get404 = (req, res, next) => {
    console.log('hi');
    res.render('responsePages', {
        pageTitle: 'SurveyIt',
        pageType: 'error'
    })
}
