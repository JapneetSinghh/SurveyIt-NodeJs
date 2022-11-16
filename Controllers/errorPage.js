
exports.get404 = (req, res, next) => {
    console.log('hi');
    res.status(404).render('responsePages', {
        pageTitle: 'SurveyIt',
        pageType: 'error'
    })
}
