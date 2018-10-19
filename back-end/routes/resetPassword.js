var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
var async = require("async");
// $gt: Date.now()
router.post("/:token", function(req, res) {
  async.waterfall([
    function(done) {
      db.query(
        `SELECT id, email, expired_date FROM public.user 
              WHERE token=$1;    
            `,
        [req.params.token],
        function(err, user) {
            console.log(user);
          if (err) {
            done(err);
            res.status(400).send("ERROR OCCURED IN FINDING TOKEN!");
          } else {
            done(err, user);
          }
        }
      );
    },
    function(user, done) {
      // console.log('axxx');
      // console.log(user);
      // console.log('/xxxx');
      if (user.rows.length == 0) {
        // token not found!
        res.status(400).send("Token not found!");
      } else {
        if (user.rows[0].expired_date >= Date.now()) {
          // if token is valid, reset password
        //   console.log(req.body.password);
          const saltRounds = 10;
          let hashpassword = bcrypt.hashSync(req.body.password, saltRounds);
          db.query(
            `UPDATE public.user SET password = $1 WHERE id=$2`,
            [hashpassword, user.rows[0].id],
            function(err) {
              console.log(hashpassword);
              console.log(user.rows[0].id);
              if (err) res.status(400).send("Error");
              else {
                // Email
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "ridehubteam@gmail.com",
                      pass: "rideHub123@"
                    }
                  });
                  var mailOptions = {
                    from: "ridehubteam@gmail.com",
                    to: user.rows[0].email,
                    subject: "Your password has changed",
                    text:
                      "This is a confirmation that the password for your account has just changed.\n\n" +
                      "The RideHub Team,\n" +
                      "https://ride-hub.herokuapp.com"
                  };
                
                  transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {a
                      console.log(error);
                      res.status(400).send("Something went wrong with sending email");
                    } else {
                      //console.log("Email sent: " + info.response);
                      res.status(200).send("Success");
                    }
                  });
                // Email end                
                res.status(200).send("Success");
                // done(user);                  
              }
            }
          );
        } else {
            res.status(400).send("Token expired!");   
        }
      }
    },
    // function (user, done) {
        function sendResetPasswordEmail(token, user, req) {

          }
    // }
  ]);
});

module.exports = router;
