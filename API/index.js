var express = require('express');  
var app = express();

// Serving static files from "public" folder
app.use(express.static('public'));

/**
 * @api {get} /user/:id/summary [Get] User information summary
 * @apiGroup User
 * @apiParam {Number} id userid
 * @apiSuccess {json} avatar User avatar
 * @apiSuccess {String} username 
 * @apiSuccess {Number} point User point for activities
 * @apiSuccess {String} role User role
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
		{
			avatar: {
			type: "Buffer",
			data: [
					68,
					58,
					...
				]
			},
			username: "admin ",
			point: 0,
			role: "Admin "
		}
 *  
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/user/:id/summary
 *
 */
app.get('user/:id/summary',function(req,res){

});

/**
 * @api {get} /user/:id/details [Get] User information details
 * @apiGroup User
 * @apiParam {Number} id userid
 * @apiSuccess {String} username 
 * @apiSuccess {json} avatar User avatar
 * @apiSuccess {Number} point User point for activities
 * @apiSuccess {String} gender User gender
 * @apiSuccess {String} address User home address
 * @apiSuccess {String} phone User phone number
 * @apiSuccess {String} description User introduction
 * @apiSuccess {String} birthday User birthday
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
		{
			username: "mode1 ",
			avatar: {
			type: "Buffer",
			data: [
					68,
					58,
					...
				]
			},
			point: 0,
			gender: "Male ",
			address: null,
			phone: null,
			description: null,
			birthday: null
		}
 *  
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/user/:id/details
 *
 */
app.get('user/:id/summary',function(req,res){

});

/**
 * @api {get} /subforum/root [Get] List of Subforums
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
 * @apiSuccess {String} subforums.type Sub-forum type. If type = 0 then child contain list of sub-forum id otherwise child contain list of thread id 
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
app.get('/subforum/root', function(req, res) {  
    // business logic for list all sub-forums...
});

/**
 * @api {get} /subforum/:id [Get] Sub-forum information
 * @apiGroup Forum
 * @apiParam {Number} id Sub-forum id
 * @apiParam {Number} userid userid
 * @apiParamExample {json} Input
 *    {
 *      "userid":"2"
 *    }
 * @apiSuccess {Number} id Sub-forum id
 * @apiSuccess {String} title Sub-forum title
 * @apiSuccess {String} description Sub-forum description
 * @apiSuccess {String} child Sub-forum child
 * @apiSuccess {Boolean} user_following_state Is User follow this sub-forum
 * @apiSuccess {Number} followers Number of user follow this sub-forum
 * @apiSuccess {String} type Sub-forum title
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			id: 2,
			title: "CAR ",
			description: "Car forum",
			child: "3,4,5",
			user_following_state: false,
			followers: "2",
			type: 0
		}
 *  
 * @apiErrorExample {json} Sub forum not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/subforum/:id
 *
 */
app.get('/subforum/:id', function(req, res) {  
  
});

/**
 * @api {post} /subforum [POST] Create new Subforum
 * @apiGroup Forum
 * @apiParam {Number} pid Forum parent id
 * @apiParam {String} title Subforum title
 * @apiParam {String} description Subforum description
 * @apiParam {Timestamp} creation_date Subforum creation date
 * @apiParam {Number} userid userid of user that creates that forum
 * @apiParamExample {json} Input
 *    {
 *      "pid":"10",
 * 		"title":"GIANT",
 * 		"description":"Giant forum",
 * 		"2018-10-13 23:30:00",
 * 		"userid":"1"
 *    }
 * @apiSuccess {String} response Create status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			"response":"Create successfully"
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.post('/subforum', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {delete} /subforum/:forumid [DELETE] Delete Subforum
 * @apiGroup Forum
 * @apiParam {Number} forumid Forum id
 * @apiSuccess {String} response Delete status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			"response":"Delete successfully"
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.delete('/subforum/:forumid', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {put} /subforum/:forumid [PUT] Update existing Subforum
 * @apiGroup Forum
 * @apiParam {Number} id Forum id
 * @apiParam {String} title New Forum title
 * @apiParam {String} description New Forum description
 * @apiParamExample {json} Input
 *    {
 * 		"title":"...",
 * 		"description":"..."
 *    }
 * @apiSuccess {String} response Update status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			"response":"Update successfully"
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.put('/subforum/:forumid', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {get} /thread/:thread_id [Get] Thread information
 * @apiGroup Thread
 * @apiParam {Number} thread_id Thread id
 * @apiSuccess {Number} id thread id
 * @apiSuccess {String} title thread title
 * @apiSuccess {json} thumbnail thread thumbnail
 * @apiSuccess {String} tag thread tag
 * @apiSuccess {String} child List of posts belong to that thread
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	  {
		id: 1,
		title: "BMW thread1 ",
		thumbnail: null,
		tag: "Help ",
		child: "1,11,12"
	  }
 *  
 * @apiErrorExample {json} Thread not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/thread/:thread_id
 *
 */
app.get('/thread/:thread_id', function(req, res) {  

});

/**
 * @api {get} /thread/filter_data [Get] Thread information for filtering
 * @apiGroup Thread
 * @apiSuccess {json[]} tags list of tags
 * @apiSuccess {String} tag_name tag name
 * @apiSuccess {Number} tag_id tag id
 * @apiSuccess {json[]} brands list of brands
 * @apiSuccess {String} brand_name brand name 
 * @apiSuccess {json[]} models list of models
 
 * @apiErrorExample {json} Thread not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/thread/:thread_id
 *
 */
app.get('/thread/filter_data', function(req, res) {  

});


/**
 * @api {post} /thread [POST] Create new Thread
 * @apiGroup Thread
 * @apiParam {String} title Thread title
 * @apiParam {Number} userid Userid of user that creates that thread
 * @apiParam {Number} forumid Forumid of forum that thread belonged to
 * @apiParam {Timestamp} creation_date Thread creation date
 * @apiParam {json} thumbnail Thumbnail of that thread
 * @apiParam {Number} tagid Tagid of thread's tag
 * @apiParam {json[]} content Content of original post
 * @apiParamExample {json} Input
 *    {
 *      "title":"Giant thread 1",
 * 		"userid":"4",
 * 		"forumid":"11",
 * 		"creation_date":"2018-10-13 23:31:00",
 * 		"thumbnail":"..."
 * 		"tagid":"1"
 * 		"content":[]
 *    }
 * @apiSuccess {Number} id Thread id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			id: 11
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.post('/thread', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {get} /post/:id?user=:userid [Get] Post information
 * @apiGroup Post
 * @apiParam {Number} id Post id
 * @apiParam {Number} userid Userid
 * @apiSuccess {json} user_post Avatar of user that owns this post
 * @apiSuccess {Boolean} user_vote_state Is the login user vote this post or not
 * @apiSuccess {Number} vote_number Number of users that votes this post
 * @apiSuccess {String} tag thread tag
 * @apiSuccess {Boolean} user_following_state Is User follow this sub-forum
 * @apiSuccess {json[]} content Json list that contain attributes of the post's content
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
		{
			id: 1,
			user_post: {
				type: "Buffer",
				data: [
						68,
						58,
						...
					]
			},
			user_vote_state: true,
			vote_number: "2",
			content: [
				{
					insert: "Hello "
				},
				{
					insert: "This is colorful",
					attributes: {
						color: "#f00"
					}
				}
			]
		}
 *  
 * @apiErrorExample {json} Post not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/post/:id ? user=:userid
 *
 */
app.get('/post/:id?user=:userid', function(req, res) {  

});


/**
 * @api {post} /post [POST] Create new POST
 * @apiGroup Post
 * @apiParam {json[]} content Post content
 * @apiParam {Timestamp} creation_date Post creation date
 * @apiParam {Number} userid Userid of user that creates that post
 * @apiParam {Number} threadid Threadid of a thread that this post belonged 
 * @apiParam {Number} pid Postid of a post that this post is comment of
 * @apiParamExample {json} Input
 *    {
 *      "title":[],
 * 		"creation_date":"2018-10-13 23:31:00",
 *   	"userid":"4",
 * 		"threadid":"11",
 * 		"pid": null
 *    }
 * @apiSuccess {Number} id post id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			id: 15
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.post('/post', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {delete} /post/:post_id [DELETE] Delete post
 * @apiGroup Post
 * @apiParam {Number} post_id Post id
 * @apiSuccess {String} response Delete status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			"response":"Delete successfully"
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.delete('/post/:post_id', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {put} /post/:post_id [PUT] Update existing Post
 * @apiGroup Post
 * @apiParam {Number} post_id Post id
 * @apiParam {json[]} content New Post content
 * @apiParamExample {json} Input
 *    {
 * 		"title":[]
 *    }
 * @apiSuccess {String} response Update status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			"response":"Update successfully"
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.put('/post/:post_id', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {post} /thread/search [POST] Thread Search 
 * @apiGroup Thread
 * @apiParam {String} text_search Text to search
 * @apiParamExample {json} Input
 *    {
 *      "text_search":"bmw"
 *    }
 * @apiSuccess {json[]} threads list threads
 * @apiSuccess {Number} threads.tid Thread id
 * @apiSuccess {String} threads.t_title Thread title
 * @apiSuccess {json[]} threads.t_content Thread content
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
		{
			"threads":[
				{
					"tid":1,
					"t_title":"BMW thread1",
					"t_content":[]
				},	
				{
					"tid":2,
					"t_title":"BMW thread2",
					"t_content":[]
				}
			]
		}
 *  
 * @apiErrorExample {json} thread list not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/thread/search
 *
 */
app.post('/thread/search', function(req, res) {  

});

/**
 * @api {post} /thread/filter [POST] Thread Filter 
 * @apiGroup Thread
 * @apiParam {String} brand brand to search
 * @apiParam {String} model model to search
 * @apiParam {String} issue issue to search
 * @apiParamExample {json} Input
 *    {
 *      "brand":"Honda",
 * 		"model":"SH Mode",
 * 		"issue":"Battery"
 *    }
 * @apiSuccess {Number} tid thread id
 * @apiSuccess {String} t_title thread title
 * @apiErrorExample {json[]} thread list not found
 *    HTTP/1.1 404 Not Found
 * @apiSampleRequest http://ride-hub.herokuapp.com/api/thread/filter
 *
 */
app.post('/thread/filter', function(req, res) {  

});

/**
 * @api {delete} /thread/:thread_id [DELETE] Delete Thread
 * @apiGroup Thread
 * @apiParam {Number} thread_id Thread id
 * @apiSuccess {String} response Delete status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			"response":"Delete successfully"
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.delete('/thread/:thread_id', function(req, res) {  
    // business logic for creating a task...
});

/**
 * @api {put} /thread/:thread_id [PUT] Update existing Thread
 * @apiGroup Thread
 * @apiParam {Number} thread_id Thread id
 * @apiParam {String} title New Thread title
 * @apiParam {Image} thumbnail New Forum thumbnail
 * @apiParam {Number} tagid New Thread tag id
 * @apiParamExample {json} Input
 *    {
 * 		"title":"...",
 * 		"thumbnail":"...",
 * 		"tagid":"..."
 *    }
 * @apiSuccess {String} response Update status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
	 	{
			"response":"Update successfully"
		}
 *  
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *
 */
app.put('/thread/:thread_id', function(req, res) {  
    // business logic for creating a task...
});

app.listen(3000, function() {  
    console.log('Task api up and running...');
});