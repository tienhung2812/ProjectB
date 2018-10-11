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


/**
 * @api {get} /forum/root Get List of Subforums
 * @apiGroup Forum
 * @apiParam {Number} userid userid
 * @apiParamExample {json} Input
 *    {
 *      "userid":"2"
 *    }
 * @apiSuccess {Object[]} subforums Sub-forum list
 * @apiSuccess {Number} subforums.id Sub-forum id
 * @apiSuccess {String} subforums.title Sub-forum title
 * @apiSuccess {String} subforums.description Sub-forum description
 * @apiSuccess {String} subforum.child Sub-forum child
 * @apiSuccess {Boolean} subforums.user_following_state Is User follow this sub-forum
 * @apiSuccess {Number} subforums.followers Number of user follow this sub-forum
 * @apiSuccess {String} subforums.type Sub-forum title
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "subforums":[
	 		{
				id: 2,
				title: "CAR ",
				description: "Car forum",
				child: "3,4,5",
				user_following_state: false,
				followers: "2",
				type: 0
			},
			{
				id: 6,
				title: "MOTOCYCLE ",
				description: "Motocycle forum",
				child: "7,8,9",
				user_following_state: false,
				followers: "0",
				type: 0
			},
			{
				id: 10,
				title: "BICYCLE ",
				description: "Bicycle forum",
				child: null,
				user_following_state: false,
				followers: "0",
				type: 1
			}
 *		]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/subforum/root
 *
 */

app.get('/forum/root', function(req, res) {  
    // business logic for list all sub-forums...
});



app.listen(3000, function() {  
    console.log('Task api up and running...');
});