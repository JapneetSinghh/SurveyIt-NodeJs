// IMPORTING EXPRESS
const express = require('express');
const app = express();
const MONGODB_URI = `mongodb+srv://japneetSinghh:sidak123@cluster0.efo4pz7.mongodb.net/SurveyIt?retryWrites=true&w=majority`;
// CSRF PROTECTION
const csrf = require('csurf');

// ADDING SESSION
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

// npm install cookie - parser
var cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(
  session({
    secret: 'my secret',
    resave: 'false',
    saveUninitialized: false,
    store: store
  })
);


// npm install--save connect - flash
var flash = require('connect-flash');


// Importing Mongoose
const mongoose = require('mongoose');
// MONGODB CONNECTION LINK

// Serving the Public Folder As Static For Assets And CSS
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Importing the userSchema
const User = require('./Models/users');

// Adding the user data to req
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      console.log('User Activated in req');
      res.locals.firstName = req.user.firstName;
      res.locals.lastName = req.user.lastName;
      res.locals.image = req.user.image;
      userType = req.user.userType;
      if (req.user.userType === 'admin') {
        res.locals.userType = 'adminPanelSurveyIt';
      } else {
        res.locals.userType = 'user';
      }
      console.log(res.locals)
      next();
    })
    .catch(err => {
      console.log(err);
    })
});

// Setting the view engine ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Adding body parser
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({ extended: false }));

// Using csrf token
const csrfProtection = csrf();
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
})

// SETTING THE AUTHENTICATION STATUS FOR ALL PAGES
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
})

// USING FLASH FUNCTION TO SEND RESPONSES TO USER
app.use(flash());

// Importing routes
const homeRoutes = require('./Routes/home');
const surveyRoutes = require('./Routes/survey');
const responseRoutes = require('./Routes/responses');
const authRoutes = require('./Routes/auth');
const adminRoutes = require('./Routes/admin');
const errorContrller = require('./Controllers/errorPage');

// Setting up the routes
app.use(homeRoutes.router);
app.use(surveyRoutes.router);
app.use(responseRoutes.router);
app.use(authRoutes.router);
app.use('/admin', adminRoutes.router);
app.use(errorContrller.get404);



// Importing bcryptjs to encrypt the password
const bcryptjs = require('bcryptjs');


// CONNECTING TO DATABASE AND STARTING THE SERVER
mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('Connected To SurveyIt Database Successfully')
    // RETURNS THE FIRST USER IT FOUNDS, IF NO USER FOUND RETURNS NULL
    User.findOne()
      .then(user => {
        if (!user) {
          console.log('No User Exists Till Now, Thereofore creating our first user');
          let password = 'admin123'
          bcryptjs.hash(password, 12)
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
                email: 'admin@surveyit.com',
                firstName: 'Japneet Singh',
                lastName: 'Baluja',
                password: hashedPassword,
                // Adding encrypted password
                userType: 'admin',
                dateCreated: dateNow,
                timeCreated: time
              })
              user.save(); // ADDS THE NEW USER TO DB
            })
        } else {
          // console.log('User Found');
        }
      }).then(result => {
        const port = process.env.PORT || 2100;
        app.listen(port, () => {
          console.log('Listening on port 2100');
        })
      })
      .catch(err => {
        console.log('Error' + err);
      })
  })
  .catch(err => {
    console.log('Failed To Connect To Database');
  })

// const port = process.env.PORT || 2100;
// app.listen(port, () => {
//   console.log('Listening on port 2100');
// })

