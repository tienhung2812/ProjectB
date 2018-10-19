// user.js - user API Module for routing
var express = require('express');
var router = express.Router();
var forum_controller = require('../controllers/forum_controller');

// GET subforum information
router.get('/root', forum_controller.subforum_get);

// GET subforum information
router.get('/:subforum_id', forum_controller.subsubforum_get);

router.get('/path/:subforum_id',forum_controller.getpath);
// create forum
router.post('/', forum_controller.forum_create);

// delete forum
router.delete('/:forumid',forum_controller.forum_delete);

// update forum
router.put('/:forum_id',forum_controller.forum_update);


module.exports = router;

