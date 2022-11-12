// IMPORTING EXPRESS
const express = require('express');
const app = express();

// Importing Mongoose
const mongoose = require('mongoose');
// MONGODB CONNECTION LINK
const MONGODB_URI = `mongodb+srv://japneetSinghh:sidak123@cluster0.efo4pz7.mongodb.net/SurveyIt?retryWrites=true&w=majority`;
// SETTING UP THE PORT FOR SERVER


// Serving the Public Folder As Static For Assets And CSS
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Importing the userSchema
const User = require('./Models/users');

// Adding the user data to req
// app.use((req, res, next) => {
//   User.findById(`636ce94855c160317edfa7c9`)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => {
//       console.log(err);
//     })
// });

// Setting the view engine ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// Adding body parser
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({ extended: false }));

// Importing routes
const homeRoutes = require('./Routes/home');
// const surveyRoutes = require('./Routes/survey');
// const responseRoutes = require('./Routes/responses');



// Setting up the routes
app.use('/', homeRoutes.router);
// app.use(surveyRoutes.router);
// app.use(responseRoutes.router);

// CONNECTING TO DATABASE AND STARTING THE SERVER
mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('Connected To SurveyIt Database Successfully')
    // RETURNS THE FIRST USER IT FOUNDS, IF NO USER FOUND RETURNS NULL
    User.findOne()
      .then(user => {
        if (!user) {
          console.log('No User Exists Till Now, Thereofore creating our first user');
          const user = new User({
            username: 'admin',
            password: '12345'
          })
          user.save(); // ADDS THE NEW USER TO DB
        } else {
          console.log('User Found');
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

