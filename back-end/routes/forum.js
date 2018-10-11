// user.js - user API Module for routing
var express = require('express');
var router = express.Router();
var forum_controller = require('../controllers/forum_controller');

// GET subforum information
router.get('/root', forum_controller.subforum_get);

// GET subforum information
router.get('/:subforum_id', forum_controller.subsubforum_get);

// Create user
//router.post('/', user_controller.user_create);

module.exports = router;

