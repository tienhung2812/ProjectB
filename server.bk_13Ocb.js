// src/server.js

// initialize the server and configure support for ejs templates
const path = require("path");
var express = require("express");
//var session = require('cookie-session')
var session   = require('express-session');
var bodyParser = require("body-parser");
var cors = require("cors");
var passport = require('passport'); 
var flash    = require('connect-flash');
//var morgan       = require('morgan');
//var cookieParser = require('cookie-parser');
const uuid = require('uuid/v4')
// import custom modules
var userRouter = require('./back-end/routes/user');
var postRouter = require('./back-end/routes/post');
var threadRouter = require('./back-end/routes/thread');
var forumRouter = require('./back-end/routes/forum');

require('./back-end/config/passport')(passport); // pass passport for configuration
// Create an Express application
var app = express();
// Congifure the Express application
app.use(cors());
//app.use(morgan('dev')); // log every request to the console
// we stores session data on the server, only session ID will be stored
/* var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2], 
  cookie: {
    secure: true, // browser sends cookie if request is being over HTTPS
    httpOnly: true, //prevent cookie accessible via javascript
    domain: 'ride-hub.herokuapp.com', //check domain of the server where URL is being request 
    //path: 'foo/bar', //URL Path that the cookie is valid
    expires: expiryDate // tell cookie to expire after a specfic amount of time
  }
}))
 */
// passport
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//app.use(cookieParser()); // read cookies (needed for auth)
// bodyParse is required to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//serve static files
app.use(
  "/RideHub/static/",
  express.static(path.join(__dirname, "build", "static"))
);

// serve apis
  app.use("/api/user", userRouter);
  app.use("/api/thread", threadRouter);
  app.use("/api/post", postRouter);
  app.use("/api/subforum", forumRouter);
// serve built React files
 app.get("*", (req, res) => {
  console.log(req.sessionID);
   res.sendFile(path.join(__dirname, "build", "index.html"));
 });

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "production";
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
