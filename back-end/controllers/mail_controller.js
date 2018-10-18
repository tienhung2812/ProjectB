<<<<<<< HEAD
var nodemailer = require("nodemailer");
const crypto = require('crypto');
const db = require("../db");
// var waterfall = require('async-waterfall');
var express = require('express');
var router = express.Router();
let token= generateResetPasswordToken();
var async = require('async');

async.waterfall([
  // Generate token
  function(done) {
    crypto.randomBytes(20, function(err, buf) {
      var token = buf.toString('hex');
      done(err, token);
    });
  },
  // Check user account and save token into database
  function (token, done) {
    //console.log(token);
    
  }
])



router.post('/', function(req, res, next) {
  // generate token
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      console.log(token);
    }
  ])
  
  //console.log(token);
  // check if the account really exists!
  db.query(`select * from public.user where email=$1`, [req.body.email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({"message":"Search email failed"});
    } else {
      if (result.rows.length == 0) {
          // email not exists -> no user account exists
          res.status(400).send({"message":"No account found. Please check your email"});
      } else {
          // if user account exist
        // we store token and expire date into database
        let expire_date = Date.now() +  3600000 // 1 hour to expire!
        db.query(`INSERT INTO public.user (email, expire_date)
                  VALUES ($1, $2)`,
                  [token, expire_date],
                  (err, insertResult) => {
                    if (err) {
                      res.status(400).send({"message":"Insertion into table failed"});
                    } else {
                      res.status(200).send({"message":"Insertion into table successfully"});
                    }
                  });
                  
      }
      //res.status(200).send({"message":"Create successfully!"});
    } 
  }); 
  // We store token and expire date into database

  // We now send token to user! 
});


function generateResetPasswordToken() {
  // 128 bit long token

}

function storeResetPasswordToken() {
  db.query(``)
}


function sendResetPasswordEmail(token, user, done) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ridehubteam@gmail.com",
      pass: "rideHub123@"
    }
  });
  var link = "https://google.com";
  var mailOptions = {
    from: "ridehubteam@gmail.com",
    to: "peter.phatvo@gmail.com",
    subject: "Reset your RideHub Forum account",
    text:
      "We have received a request from you (or maybe someone else) to reset your password for RideHub Forum account.\n\n" +
      "If you really wish to reset your password. Follow the link below:\n\n" +
      'http://' + req.headers.host + '/reset/' + token + '\n\n' +
      "If you don't wish to reset your password, disregard this email.\n\n" +
      "The RideHub Team,\n" +
      "https://ride-hub.herokuapp.com"
  };
  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {      
      console.log("Email sent: " + info.response);      
    }
  });
}
=======
 var nodemailer = require('nodemailer');

 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ridehubteam@gmail.com',
    pass: 'rideHub123@'
  }
});
var link = 'https://google.com'
var mailOptions = {
  from: 'ridehubteam@gmail.com',
  to: 'peter.phatvo@gmail.com',
  subject: 'Reset your RideHub Forum account',
  text: `We have received a request from you to reset your password for RideHub Forum account.
         If you really wish to reset your password. Follow the link below:
        `+ link + 
        `If you don't wish to reset your password, disregard this email.
         The RideHub Team,
         https://ride-hub.herokuapp.com
        `
    };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
>>>>>>> d2f7b0a51e9e4b0cbbdc4dda2e994ca7465b74dd
