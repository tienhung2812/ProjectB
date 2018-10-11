// post.js - Post API Module
var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/post_controller');

// GET post 
router.get('/:post_id', post_controller.post_get);

// POST post
router.post('/', post_controller.post_create);

module.exports = router;