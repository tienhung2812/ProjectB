// src/server.js

// initialize the server and configure support for ejs templates
const path = require("path")
//const server = require("http-server")
var express = require('express');
const react = require("react")
var app = express();
app.use("/RideHub/static/", express.static(path.join(__dirname, "build", "icons")))
app.use("/RideHub/static/",express.static(path.join(__dirname, "build", "static")))
// serve built React files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
