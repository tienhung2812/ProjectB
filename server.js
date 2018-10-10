// src/server.js

// initialize the server and configure support for ejs templates
const path = require("path")
var express = require('express');
var bodyParser = require('body-parser')
const { Pool} = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/';

const pool = new Pool({
  // user: 'postgres',
  // host: 'localhost',
  // password: 'gresPost123@',
  // database: 'ridehub-demo',
  // port: 5432,
})




//var bodyParser = require('body-parser');
//const react = require("react")
var app = express();

// configure the app to use bodyParser 
// bodyParse is required to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/RideHub/static/", express.static(path.join(__dirname, "build", "icons")))
//serve static files
app.use("/RideHub/static/",express.static(path.join(__dirname, "build", "static")))

// serve apis 

app.route('/api/data')
  .get(function (req, res) {
    
/*     var content = [
    {insert: "Hello\n"},
    {insert: "This is colorful", attributes: {color: '#f00'}}
    ];
    res.json({content});
 */
  pool.query('SELECT content from post', (err, data) => {
    //console.log(err, data.rows[0])
    res.json(data.rows[0].content)
    pool.end()
  })

  })
  
  .post(function (req, res) {
    var query = req.body;    
    console.log(query);
    //res.json(content)
    res.end("yes");
  })

  /* .put(function (req, res) {
    res.send('Update the book')
  }) */

//app.get('/api/data/demo', function(request, response){
//});

// app.post('/api/data/demo2', function (req, res) {
//   res.send('POST request to the homepage')
// })

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
