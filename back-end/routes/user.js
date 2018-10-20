// user.js - user API Module for routing
var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller');

router.get('/notification',user_controller.notification);
router.get('/latestactivity',user_controller.latest_activity);
router.get('/billboard',user_controller.billboard);
// GET user detail information
router.put('/', user_controller.user_update)

router.get('/:user_id/details', user_controller.user_details_get)

// GET user summary information
router.get('/:user_id/summary', user_controller.user_summary_get)

router.delete('/:username', user_controller.user_delete)

router.put('/modify/role', user_controller.user_modify_role);

router.put('/modify/password', user_controller.user_modify_password);



module.exports = router;

