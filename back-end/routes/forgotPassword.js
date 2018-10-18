var nodemailer = require("nodemailer");
const crypto = require("crypto");
const db = require("../db");
// var waterfall = require('async-waterfall');
var express = require("express");
var router = express.Router();
var async = require("async");

router.post("/", function(req, res, next) {
  // generate token
  async.waterfall([
    // generate token 128 bit long!
    function(done) {
      crypto.randomBytes(128, function(err, buf) {
        var token = buf.toString("hex");
        done(err, token);
      });
    },
    // check if user account exists. If yes, store token and expired_date into database
    function(token, done) {
      // check if the account really exists!
      db.query(
        `select * from public.user where email=$1`,
        [req.body.email],
        (err, user) => {
          if (err) {
            console.log(err);
            res.status(400).send({ message: "Search email failed" });
          } else {
            if (user.rows.length == 0) {
              // email not exists -> no user account exists
              res
                .status(400)
                .send({ message: "No account found. Please check your email" });
            } else {
              // if user account exist
              // we store token and expire date into database
              let expire_date = toLocalTime(Date.now() + 3600000); // 1 hour to expire!
              db.query(
                `UPDATE public.user SET token=$1, expired_date=$2 WHERE email=$3`,
                [token, expire_date, req.body.email],
                (err) => {
                done(err, user.rows[0], token);
                }
              );
            }
          }
        }
      );
    },
    // Then Send reset email to user
    function(user, token) {
        sendResetPasswordEmail(token, user, req);
        res.send({"message":"Send reset password email"});
    }
  ], function (err){
      if (err) return next(err);
      res.status(200).send({"message": "Server has just sent reset email"});
      //res.redirect()''
  });
});


function sendResetPasswordEmail(token, user, req) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ridehubteam@gmail.com",
      pass: "rideHub123@"
    }
  });
  var mailOptions = {
    from: "ridehubteam@gmail.com",
    to: user.email,
    subject: "Reset your RideHub Forum account",
    text:
      "We have received a request from you (or maybe someone else) to reset your password for RideHub Forum account.\n\n" +
      "If you really wish to reset your password. Follow the link below:\n\n" +
      "http://" +
      req.headers.host +
      "/api/reset-password/" +
      token +
      "\n\n" +
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

// credits: coderwall.com
var toLocalTime = function(time) {
    var d = new Date(time);
    var offset = (new Date().getTimezoneOffset() / 60) * -1;
    var n = new Date(d.getTime() + offset);
    return n;
  };




  module.exports = router;
