// post.js - Post API Module
var express = require('express');
var router = express.Router();
var thread_controller = require('../controllers/thread_controller');

// GET thread 
router.get('/:thread_id', thread_controller.thread_get_by_id);

// POST thread


module.exports = router;