
exports.get404 = (req, res, next) => {
    res.render('responsepages', {
        pageTitle: 'SurveyIt',
        pageType: 'error'
    })
}
