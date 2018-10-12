var express = require('express');  
var app = express();

// Serving static files from "public" folder
app.use(express.static('public'));


/**
 * @api {post} /checkUserLogin Check USER login
 * @apiGroup User
 * @apiParam {String} username Username
 * @apiParam {String} password User Password
 * @apiParamExample {json} Input
 *    {
 *      "username": "admin",
 *      "password": "123456"
 *    }
 * @apiSuccess {Object} status Authentication status
 * @apiSuccess {String} status.type Authentication type
 * @apiSuccess {String} status.message Authentication message
 * @apiSuccess {Number} status.code Authentication code
 * @apiSuccess {String} status.error is Error?
 * @apiSuccess {Object[]} data Return data
 * @apiSuccess {String} data.status Authentication status
 * @apiSuccess {Object} data.user User information
 * @apiSuccess {Object} data.user.id Userid
 * @apiSuccess {Object} data.user.username username
 * @apiSuccess {Object} data.user.role User role
 * @apiSuccess {Object} data.session_token Session token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status":{
 *            "type": "success",
 *            "message": "Success",
 *            "code": 200,
 *            "error": false
 *      },
 *      "data":[
 *          {
 *              "status": "Authenticated",
 *              "user":{
 *                  "id":"1",
 *                  "username":"admin",
 *                  "role":"Admin"
 *              },
 *              "session_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 *          }
 *      ]
 *    }
 * @apiErrorExample {json} Authentication Failed
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *          "status":{
 *            "type": Unauthorized,
 *            "message": "Authentication Failed: Invalid user credentials",
 *            "code": 401,
 *            "error":true
 *          }
 *    }
 */
app.post('/checkUserLogin', function(req, res) {  
    // business logic for create a task...
});

app.listen(3000, function() {  
    console.log('Task api up and running...');
});