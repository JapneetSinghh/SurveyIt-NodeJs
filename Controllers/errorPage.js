
exports.get404 = (req, res, next) => {
    console.log('hi');
    res.render('responsepages', {
        pageTitle: 'SurveyIt',
        pageType: 'error'
    })
}
