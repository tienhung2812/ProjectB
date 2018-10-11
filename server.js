// src/server.js

// initialize the server and configure support for ejs templates
const path = require("path");
var express = require("express");
var bodyParser = require("body-parser");


var cors = require("cors");
var userRouter = require('./back-end/routes/user');
var postRouter = require('./back-end/routes/post');
var threadRouter = require('./back-end/routes/thread');
var forumRouter = require('./back-end/routes/forum');
// Create an Express application
var app = express();
app.use(cors());
// bodyParse is required to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serve static files
app.use(
  "/RideHub/static/",
  express.static(path.join(__dirname, "build", "icons"))
);
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

/* 
INSERT INTO post
(content,creation_date,userid,threadid,pid)
VALUES
(ARRAY['{"insert": "Hello\n"}','{"insert": "This is colorful", "attributes": {"color": "#f00"}}']::json[],'2018-10-10 23:45:00',2,1,1);
*/
