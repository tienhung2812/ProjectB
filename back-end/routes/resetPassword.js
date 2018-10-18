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
        `SELECT id, expired_date FROM public.user 
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
      if (user.rows.length == 0) {
        // token not found!
        res.status(400).send("Token not found!");
      } else {
        if (user.rows[0].expired_date >= Date.now()) {
          // if token is valid, reset password
          console.log(req.body.password);
          const saltRounds = 10;
          let hashpassword = bcrypt.hashSync(req.body.password, saltRounds);
          db.query(
            `UPDATE public.user SET password = $1 WHERE id=$2`,
            [hashpassword, user.id],
            function(err) {
              if (err) res.status(400).send("Error");
              else res.status(200).send("Success");
            }
          );
        } else {
            res.status(400).send("Token expired!");   
        }
      }
    }
  ]);
});

module.exports = router;
