// user.js - user API Module for routing
var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller');

// GET user detail information
router.get('/:user_id/details', user_controller.user_details_get)

// GET user summary information
router.get('/:user_id/summary', user_controller.user_summary_get)

router.delete('/:username', user_controller.user_delete)

router.put('/', user_controller.user_update)


module.exports = router;

