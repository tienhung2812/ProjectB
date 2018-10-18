// src/server.js

// initialize the server and configure support for ejs templates
const path = require("path");
var express = require("express");
//var session = require('cookie-session')
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
var flash = require("connect-flash");
//const FileStore = require("session-file-store")(session);
var pgSession = require('connect-pg-simple')(session);
var cookieParser = require('cookie-parser');
const uuid = require("uuid/v4");

// import custom modules
var userRouter = require("./back-end/routes/user");
var postRouter = require("./back-end/routes/post");
var threadRouter = require("./back-end/routes/thread");
var forumRouter = require("./back-end/routes/forum");
var forgotPasswordRouter = require('./back-end/routes/forgotPassword');
var resetPasswordRouter = require('./back-end/routes/resetPassword');
require("./back-end/config/passport")(passport); // pass passport for configuration


// Create an Express application
var app = express();
// Congifure the Express application
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser()); // read cookies (needed for auth)
// bodyParse is required to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./back-end/db");
const cookieTimeLife = 45*60*1000;

app.use(flash());

app.use(
  session({
     genid: req => {
      return uuid(); // use UUIDs for session IDs
    }, 
    store: new pgSession({
      pool : db.rideHubPool,                // Connection pool
      tableName : 'session'   // Use another table-name than the default "session" one
    }),
    secret: "JeNX5lMRkF3DAkXc65oboQWk0z6pCE00", //a random value for hashing  session id
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: cookieTimeLife, 
             expires: new Date(Date.now() + cookieTimeLife),
             httpOnly: false,
             secure: false,
            //  domain: "ride-hub.herokuapp.com"
            }
  })
);


app.use(passport.initialize());
app.use(passport.session());


//serve static files
app.use(
  "/RideHub/static/",
  express.static(path.join(__dirname, "build", "static"))
);

// serve apis express.static(path.join(__dirname, "build", "static")
app.use("/api/user", userRouter);
app.use("/api/thread", threadRouter);
app.use("/api/post", postRouter);
app.use("/api/subforum", forumRouter);
app.use("/api/forgot-password", forgotPasswordRouter);
app.use("/api/reset-password", resetPasswordRouter);

app.use("/api/Help", express.static(path.join(__dirname, "API", "apidoc")));

// create the login get and post routes
app.post('/api/login', function(req, res, next) {
  //res.send({"success": "true"});
  passport.authenticate('signin', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      res.status(401);
      return res.status(401).send({
          "success": "false"
        });      
    }         
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      else {
        return res.send({
          "success": "true",
          "role": req.session.passport.user.role,
          "userid": req.session.passport.user.id
        });
      }
      
    });
  })(req, res, next);
});

app.post('/api/signup', function(req, res, next) {
  //res.send({"success": "true"});
  passport.authenticate('signup', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      res.status(401);
      //console.log(info.message);
      return res.status(401).send({
          "message": "username already exists",
          "success": "false"
        });      
    }         
    req.login(user, function(err) {
      if (err) { return next(err); }
      //else {                
        return res.send({
          "message": "new account is created successfully",
          "success": "true"
        });
      //}
      
    });
  })(req, res, next);
});



 
// app.post(
//   "/api/signup",  
//   passport.authenticate("signup", {
//     successRedirect: "/",
//     failureRedirect: "/api/signup",
//     //badRequestMessage : "error",
//     failureFlash: true
//   })
// );


app.post('/api/logout', function(req, res){
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});


app.get("/api/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("you hit the authentication endpoint\n");
  } else {
    res.redirect("/");
  }
});

// serve built React files
app.get("*", (req, res) => {
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
