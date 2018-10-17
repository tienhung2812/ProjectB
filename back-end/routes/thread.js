// post.js - Post API Module
var express = require('express');
var router = express.Router();
var thread_controller = require('../controllers/thread_controller');

// get thread filter data
router.get('/filter_data',thread_controller.thread_filter_get_data);

// GET thread 
router.get('/:thread_id', thread_controller.thread_get_by_id);

// Create thread
router.post('/', thread_controller.thread_create);

// Delete thread
router.delete('/:thread_id',thread_controller.thread_delete);

// Update thread
router.put('/:thread_id',thread_controller.thread_update);

// Search thread
router.post('/search',thread_controller.thread_search);



module.exports = router;