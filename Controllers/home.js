exports.getHome = (req, res, next) => {
    console.log("Getting home page");
    res.render('Home/index', {
        pageTitle: "SurveyIt | Home",
        path: "/home"
    })
}

exports.getDashboard = (req, res, next) => {
    console.log("Getting Dashboard");
    res.render('Dashboard/dashboard.ejs', {
        pageTitle: "SurveyIt | Home",
        path: "/dashboard"
    })
}

