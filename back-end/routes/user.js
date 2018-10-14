// user.js - user API Module for routing
var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller');

// GET user detail information
router.get('/:user_id/details', user_controller.user_details_get)

// GET user summary information
router.get('/:user_id/summary', user_controller.user_summary_get)

// Create user

/* router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
 */

module.exports = router;

