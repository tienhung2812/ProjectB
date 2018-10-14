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

const uuid = require("uuid/v4");

// import custom modules
var userRouter = require("./back-end/routes/user");
var postRouter = require("./back-end/routes/post");
var threadRouter = require("./back-end/routes/thread");
var forumRouter = require("./back-end/routes/forum");

require("./back-end/config/passport")(passport); // pass passport for configuration



// Create an Express application
var app = express();
// Congifure the Express application
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cookieParser()); // read cookies (needed for auth)
// bodyParse is required to get the data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./back-end/db");

// passport
// 


app.use(
  session({
     /* genid: req => {
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    }, */
    //store: new FileStore(),
    store: new pgSession({
      pool : db.rideHubPool,                // Connection pool
      tableName : 'session'   // Use another table-name than the default "session" one
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10*60*1000}
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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

// test
// create the login get and post routes
app.get('/api/login', (req, res) => {
  console.log('signin: ' + req.sessionID);
  res.send(`You got the login page!\n`)
})

app.post(
  "/api/login",  
  passport.authenticate("signin", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

app.get('/api/signup', (req, res) => {
  console.log('signup success: ' + req.sessionID);
  res.send(`You got the signup page!\n`)
})
 

app.post(
  "/api/signup",  
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  })
);



app.post('/api/logout', function(req, res){
  console.log('log out: ' + req.sessionID);
  req.logout();
  res.redirect('/');
});




app.get("/api/authrequired", (req, res) => {
  console.log("Inside GET /authrequired callback");
  console.log("id: "+req.sessionID);
  console.log(`User authenticated? ${req.isAuthenticated()}`);
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
