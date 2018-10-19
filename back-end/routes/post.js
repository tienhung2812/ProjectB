// post.js - Post API Module
var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/post_controller');

// GET post 
router.get('/:post_id', post_controller.post_get);

router.post('/vote',post_controller.post_vote);

// POST post
router.post('/', post_controller.post_create);

// Delete post
router.delete('/:post_id',post_controller.post_delete);

// Update post
router.put('/:post_id',post_controller.post_update);

module.exports = router;