define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "task-api/doc/main.js",
    "group": "D__task_api_doc_main_js",
    "groupTitle": "D__task_api_doc_main_js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/subforum/:forumid",
    "title": "[DELETE] Delete Subforum",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "forumid",
            "description": "<p>Forum id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Delete status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\t\"response\":\"Delete successfully\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Forum",
    "name": "DeleteSubforumForumid"
  },
  {
    "type": "get",
    "url": "/subforum/:id",
    "title": "[Get] Sub-forum information",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sub-forum id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>userid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"userid\":\"2\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sub-forum id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Sub-forum title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Sub-forum description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "child",
            "description": "<p>Sub-forum child</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user_following_state",
            "description": "<p>Is User follow this sub-forum</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "followers",
            "description": "<p>Number of user follow this sub-forum</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Sub-forum title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\tid: 2,\n\t\t\ttitle: \"CAR \",\n\t\t\tdescription: \"Car forum\",\n\t\t\tchild: \"3,4,5\",\n\t\t\tuser_following_state: false,\n\t\t\tfollowers: \"2\",\n\t\t\ttype: 0\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Sub forum not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/subforum/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Forum",
    "name": "GetSubforumId"
  },
  {
    "type": "get",
    "url": "/subforum/root",
    "title": "[Get] List of Subforums",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>userid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"userid\":\"2\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "subforums",
            "description": "<p>Sub-forum list</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "subforums.id",
            "description": "<p>Sub-forum id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subforums.title",
            "description": "<p>Sub-forum title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subforums.description",
            "description": "<p>Sub-forum description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subforum.child",
            "description": "<p>Sub-forum child</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "subforums.user_following_state",
            "description": "<p>Is User follow this sub-forum</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "subforums.followers",
            "description": "<p>Number of user follow this sub-forum</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subforums.type",
            "description": "<p>Sub-forum type. If type = 0 then child contain list of sub-forum id otherwise child contain list of thread id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"subforums\":[\n\t \t\t{\n\t\t\t\tid: 2,\n\t\t\t\ttitle: \"CAR \",\n\t\t\t\tdescription: \"Car forum\",\n\t\t\t\tchild: \"3,4,5\",\n\t\t\t\tuser_following_state: false,\n\t\t\t\tfollowers: \"2\",\n\t\t\t\ttype: 0\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 6,\n\t\t\t\ttitle: \"MOTOCYCLE \",\n\t\t\t\tdescription: \"Motocycle forum\",\n\t\t\t\tchild: \"7,8,9\",\n\t\t\t\tuser_following_state: false,\n\t\t\t\tfollowers: \"0\",\n\t\t\t\ttype: 0\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 10,\n\t\t\t\ttitle: \"BICYCLE \",\n\t\t\t\tdescription: \"Bicycle forum\",\n\t\t\t\tchild: null,\n\t\t\t\tuser_following_state: false,\n\t\t\t\tfollowers: \"0\",\n\t\t\t\ttype: 1\n\t\t\t}\n\t\t]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/subforum/root"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Forum",
    "name": "GetSubforumRoot"
  },
  {
    "type": "post",
    "url": "/subforum",
    "title": "[POST] Create new Subforum",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pid",
            "description": "<p>Forum parent id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Subforum title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Subforum description</p>"
          },
          {
            "group": "Parameter",
            "type": "Timestamp",
            "optional": false,
            "field": "creation_date",
            "description": "<p>Subforum creation date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>userid of user that creates that forum</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n     \"pid\":\"10\",\n\t\t\"title\":\"GIANT\",\n\t\t\"description\":\"Giant forum\",\n\t\t\"2018-10-13 23:30:00\",\n\t\t\"userid\":\"1\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Create status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\t\"response\":\"Create successfully\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Forum",
    "name": "PostSubforum"
  },
  {
    "type": "put",
    "url": "/subforum/:forumid",
    "title": "[PUT] Update existing Subforum",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Forum id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>New Forum title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>New Forum description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n\t\t\"title\":\"...\",\n\t\t\"description\":\"...\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Update status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\t\"response\":\"Update successfully\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Forum",
    "name": "PutSubforumForumid"
  },
  {
    "type": "delete",
    "url": "/post/:post_id",
    "title": "[DELETE] Delete post",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Delete status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\t\"response\":\"Delete successfully\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Post",
    "name": "DeletePostPost_id"
  },
  {
    "type": "get",
    "url": "/post/:id?user=:userid",
    "title": "[Get] Post information",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>Userid</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "user_post",
            "description": "<p>Avatar of user that owns this post</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user_vote_state",
            "description": "<p>Is the login user vote this post or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vote_number",
            "description": "<p>Number of users that votes this post</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>thread tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user_following_state",
            "description": "<p>Is User follow this sub-forum</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "content",
            "description": "<p>Json list that contain attributes of the post's content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t\t{\n\t\t\tid: 1,\n\t\t\tuser_post: {\n\t\t\t\ttype: \"Buffer\",\n\t\t\t\tdata: [\n\t\t\t\t\t\t68,\n\t\t\t\t\t\t58,\n\t\t\t\t\t\t...\n\t\t\t\t\t]\n\t\t\t},\n\t\t\tuser_vote_state: true,\n\t\t\tvote_number: \"2\",\n\t\t\tcontent: [\n\t\t\t\t{\n\t\t\t\t\tinsert: \"Hello \"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tinsert: \"This is colorful\",\n\t\t\t\t\tattributes: {\n\t\t\t\t\t\tcolor: \"#f00\"\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Post not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/post/:id ? user=:userid"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Post",
    "name": "GetPostIdUserUserid"
  },
  {
    "type": "post",
    "url": "/post",
    "title": "[POST] Create new POST",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json[]",
            "optional": false,
            "field": "content",
            "description": "<p>Post content</p>"
          },
          {
            "group": "Parameter",
            "type": "Timestamp",
            "optional": false,
            "field": "creation_date",
            "description": "<p>Post creation date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>Userid of user that creates that post</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "threadid",
            "description": "<p>Threadid of a thread that this post belonged</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pid",
            "description": "<p>Postid of a post that this post is comment of</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n     \"title\":[],\n\t\t\"creation_date\":\"2018-10-13 23:31:00\",\n  \t\"userid\":\"4\",\n\t\t\"threadid\":\"11\",\n\t\t\"pid\": null\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>post id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\tid: 15\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Post",
    "name": "PostPost"
  },
  {
    "type": "put",
    "url": "/post/:post_id",
    "title": "[PUT] Update existing Post",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "post_id",
            "description": "<p>Post id</p>"
          },
          {
            "group": "Parameter",
            "type": "json[]",
            "optional": false,
            "field": "content",
            "description": "<p>New Post content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n\t\t\"title\":[]\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Update status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\t\"response\":\"Update successfully\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Post",
    "name": "PutPostPost_id"
  },
  {
    "type": "delete",
    "url": "/thread/:thread_id",
    "title": "[DELETE] Delete Thread",
    "group": "Thread",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "thread_id",
            "description": "<p>Thread id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Delete status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\t\"response\":\"Delete successfully\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Thread",
    "name": "DeleteThreadThread_id"
  },
  {
    "type": "get",
    "url": "/thread/filter_data",
    "title": "[Get] Thread information for filtering",
    "group": "Thread",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "tags",
            "description": "<p>list of tags</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag_name",
            "description": "<p>tag name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tag_id",
            "description": "<p>tag id</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "brands",
            "description": "<p>list of brands</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "brand_name",
            "description": "<p>brand name</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "models",
            "description": "<p>list of models</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Thread not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/thread/:thread_id"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Thread",
    "name": "GetThreadFilter_data"
  },
  {
    "type": "get",
    "url": "/thread/:thread_id",
    "title": "[Get] Thread information",
    "group": "Thread",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "thread_id",
            "description": "<p>Thread id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>thread id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>thread title</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>thread thumbnail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>thread tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "child",
            "description": "<p>List of posts belong to that thread</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t  {\n\t\tid: 1,\n\t\ttitle: \"BMW thread1 \",\n\t\tthumbnail: null,\n\t\ttag: \"Help \",\n\t\tchild: \"1,11,12\"\n\t  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Thread not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/thread/:thread_id"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Thread",
    "name": "GetThreadThread_id"
  },
  {
    "type": "post",
    "url": "/thread",
    "title": "[POST] Create new Thread",
    "group": "Thread",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Thread title</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>Userid of user that creates that thread</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "forumid",
            "description": "<p>Forumid of forum that thread belonged to</p>"
          },
          {
            "group": "Parameter",
            "type": "Timestamp",
            "optional": false,
            "field": "creation_date",
            "description": "<p>Thread creation date</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Thumbnail of that thread</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tagid",
            "description": "<p>Tagid of thread's tag</p>"
          },
          {
            "group": "Parameter",
            "type": "json[]",
            "optional": false,
            "field": "content",
            "description": "<p>Content of original post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n     \"title\":\"Giant thread 1\",\n\t\t\"userid\":\"4\",\n\t\t\"forumid\":\"11\",\n\t\t\"creation_date\":\"2018-10-13 23:31:00\",\n\t\t\"thumbnail\":\"...\"\n\t\t\"tagid\":\"1\"\n\t\t\"content\":[]\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Thread id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\tid: 11\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Thread",
    "name": "PostThread"
  },
  {
    "type": "post",
    "url": "/thread/filter",
    "title": "[POST] Thread Filter",
    "group": "Thread",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>brand to search</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>model to search</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issue",
            "description": "<p>issue to search</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n     \"brand\":\"Honda\",\n\t\t\"model\":\"SH Mode\",\n\t\t\"issue\":\"Battery\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tid",
            "description": "<p>thread id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "t_title",
            "description": "<p>thread title</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "thread list not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json[]"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/thread/filter"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Thread",
    "name": "PostThreadFilter"
  },
  {
    "type": "post",
    "url": "/thread/search",
    "title": "[POST] Thread Search",
    "group": "Thread",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text_search",
            "description": "<p>Text to search</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"text_search\":\"bmw\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "threads",
            "description": "<p>list threads</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "threads.tid",
            "description": "<p>Thread id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "threads.t_title",
            "description": "<p>Thread title</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "threads.t_content",
            "description": "<p>Thread content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t\t{\n\t\t\t\"threads\":[\n\t\t\t\t{\n\t\t\t\t\t\"tid\":1,\n\t\t\t\t\t\"t_title\":\"BMW thread1\",\n\t\t\t\t\t\"t_content\":[]\n\t\t\t\t},\t\n\t\t\t\t{\n\t\t\t\t\t\"tid\":2,\n\t\t\t\t\t\"t_title\":\"BMW thread2\",\n\t\t\t\t\t\"t_content\":[]\n\t\t\t\t}\n\t\t\t]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "thread list not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/thread/search"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Thread",
    "name": "PostThreadSearch"
  },
  {
    "type": "put",
    "url": "/thread/:thread_id",
    "title": "[PUT] Update existing Thread",
    "group": "Thread",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "thread_id",
            "description": "<p>Thread id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>New Thread title</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>New Forum thumbnail</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tagid",
            "description": "<p>New Thread tag id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n\t\t\"title\":\"...\",\n\t\t\"thumbnail\":\"...\",\n\t\t\"tagid\":\"...\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Update status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t \t{\n\t\t\t\"response\":\"Update successfully\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "Thread",
    "name": "PutThreadThread_id"
  },
  {
    "type": "get",
    "url": "/user/:id/details",
    "title": "[Get] User information details",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>userid</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "avatar",
            "description": "<p>User avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "point",
            "description": "<p>User point for activities</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>User gender</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User home address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>User introduction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>User birthday</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t\t{\n\t\t\tusername: \"mode1 \",\n\t\t\tavatar: {\n\t\t\ttype: \"Buffer\",\n\t\t\tdata: [\n\t\t\t\t\t68,\n\t\t\t\t\t58,\n\t\t\t\t\t...\n\t\t\t\t]\n\t\t\t},\n\t\t\tpoint: 0,\n\t\t\tgender: \"Male \",\n\t\t\taddress: null,\n\t\t\tphone: null,\n\t\t\tdescription: null,\n\t\t\tbirthday: null\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/user/:id/details"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "User",
    "name": "GetUserIdDetails"
  },
  {
    "type": "get",
    "url": "/user/:id/summary",
    "title": "[Get] User information summary",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>userid</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "avatar",
            "description": "<p>User avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "point",
            "description": "<p>User point for activities</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t\t{\n\t\t\tavatar: {\n\t\t\ttype: \"Buffer\",\n\t\t\tdata: [\n\t\t\t\t\t68,\n\t\t\t\t\t58,\n\t\t\t\t\t...\n\t\t\t\t]\n\t\t\t},\n\t\t\tusername: \"admin \",\n\t\t\tpoint: 0,\n\t\t\trole: \"Admin \"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://ride-hub.herokuapp.com/api/user/:id/summary"
      }
    ],
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "User",
    "name": "GetUserIdSummary"
  },
  {
    "type": "get",
    "url": "/user/notification",
    "title": "[Get] User information notification",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "noti",
            "description": "<p>Notification name</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creation_date",
            "description": "<p>date of the notifiation</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "threadid",
            "description": "<p>threadid for notification about vote, follow, new thread, new post</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "forumid",
            "description": "<p>forum id for notification about new subforum</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n\t\t{\n\t\t \t\"noti\": \"@john creates new thread sefse... on your followed forum SH Mode\",\n        \t\"creation_date\": \"2018-10-13T00:00:00.000Z\",\n        \t\"threadid\": \"22\",\n        \t\"forumid\": null\n\t\t},.....\n\t]",
          "type": "json[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "User",
    "name": "GetUserNotification"
  }
] });
