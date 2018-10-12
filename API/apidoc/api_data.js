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
    "type": "post",
    "url": "/checkUserLogin",
    "title": "Check USER login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Authentication status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.type",
            "description": "<p>Authentication type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.message",
            "description": "<p>Authentication message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status.code",
            "description": "<p>Authentication code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.error",
            "description": "<p>is Error?</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Return data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>Authentication status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.user",
            "description": "<p>User information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.user.id",
            "description": "<p>Userid</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.user.username",
            "description": "<p>username</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.user.role",
            "description": "<p>User role</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.session_token",
            "description": "<p>Session token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\":{\n        \"type\": \"success\",\n        \"message\": \"Success\",\n        \"code\": 200,\n        \"error\": false\n  },\n  \"data\":[\n      {\n          \"status\": \"Authenticated\",\n          \"user\":{\n              \"id\":\"1\",\n              \"username\":\"admin\",\n              \"role\":\"Admin\"\n          },\n          \"session_token\": \"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\"\n      }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Authentication Failed",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n      \"status\":{\n        \"type\": Unauthorized,\n        \"message\": \"Authentication Failed: Invalid user credentials\",\n        \"code\": 401,\n        \"error\":true\n      }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "task-api/index.js",
    "groupTitle": "User",
    "name": "PostCheckuserlogin"
  }
] });