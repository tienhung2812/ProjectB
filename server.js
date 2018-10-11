// src/server.js

// initialize the server and configure support for ejs templates
const path = require("path")
var express = require('express');
var bodyParser = require('body-parser')
const { Pool} = require('pg')
const url = require('url')
var cors = require('cors')

//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/';
const params = url.parse(process.env.DATABASE_URL );
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const pool = new Pool(config);
// const pool = new Pool({
  // user: 'postgres',
  // host: 'localhost',
  // password: 'gresPost123@',
  // database: 'ridehub-demo',
  // port: 5432,
// });

//var bodyParser = require('body-parser');
//const react = require("react")
var app = express();
app.use(cors())
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
    try {
      res.json(data.rows[0].content)
 //     pool.end()
    } catch (e) {
      console.log(e)
      res.status(400).send('Data is not available')
    }
    
  })

  })
  
  .post(function (req, res) {
    try {
      var query = req.body
      console.log(query)
      res.end("success")
    } catch (e) {
        res.status(400).send('Data is not available')
    }
    
    //res.json(content)
    
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


/* 
INSERT INTO post
(content,creation_date,userid,threadid,pid)
VALUES
(ARRAY['{"insert": "Hello\n"}','{"insert": "This is colorful", "attributes": {"color": "#f00"}}']::json[],'2018-10-10 23:45:00',2,1,1);
*/