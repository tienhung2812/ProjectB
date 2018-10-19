// post.js - Post API Module
var express = require('express');
var router = express.Router();
const db = require("../db");
// Check Email exists or not

router.post('/', function(req, res){
    // console.log(req.body);
    db.query(`SELECT email FROM public.user WHERE email=$1`, [req.body.email], (err, result) => {
        if (err) {
            // console.log(err);
            res.status(400).send({"message":"Error occured during searching for email"});
        } else {
            // console.log(result);
            if (result.rows.length == 0) {
                res.status(200).send({"message":"Email is not registered yet!"});
            } else {
                res.status(400).send({"message":"Email is already taken by someone"});
            }
        }
    });
});

module.exports = router;