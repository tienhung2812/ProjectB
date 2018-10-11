# API Request for Ridehub

## GET 
## 1. Account
### 1.2 Account short information
This is user for Header
#### Request
```json
{
    "username":"SAMPLE-USER-NAME",
    "userID":"userID",
    "token":"SAMPLE-token",
}
```
#### Respone
```json
{
    "avatar": "AVATAR-URL",
    "username": "SAMPLE-USER-NAME",
    "point":"100",
    "role":0
}
```
Role will define later in group meeting

### 1.2 Account Full Information
This is use for User page
#### Request
```json
{
    "username":"SAMPLE-USER-NAME",
    "userID":"userID",
    "token":"SAMPLE-token",
}
```
#### Respone
```json
{
    "username":"SAMPLE-USER-NAME",
    "avatar": "SAMPLE-AVATAR-URL",
    "point":"1000",
    "gender":"SAMPLE-GENDER",
    "address":"SAMPLE-ADDRESS",
    "phone":"SAMPLE-PHONE",
    "description":"SAMPLE-DES",
    "birthday":"DATE"
}
```

### 1.3 Notification
This will be discuss in group meeting

### 1.4 Login
This will be discuss in group meeting


## 2. Main
### Subforum pid 0 infomation
Get all Subforum have parrent_id = 0
This is for Homepage
#### Request
```json
{
    "username":"SAMPLE-USERNAME",
    "userID":"userID",
    "parrent_id":0,
    "token":"SAMPLE-token"
}
```
### Respone
```json
{
    "subforums_pid0":[
        {
            "id":"SAMPLE-ID-1",
            "title":"SAMPLE-TITLE",
            "description":"SAMPLE-DES",
            "user-following-state":true,
            "follower":"SAMPLE-NUMBERFOLLOWER",
            "type":0,
            "child":[
                "SAMPLE-CHILD-ID",...
            ]

        },
        {
            "id":"SAMPLE-ID-2",
            "title":"SAMPLE-TITLE",
            "description":"SAMPLE-DES",
            "user-following-state":true,
            "follower":"SAMPLE-NUMBERFOLLOWER",
            "type":0,
            "child":[
                "SAMPLE-CHILD-ID",...
            ]

        },
        ...
    ]
}
```
```type : 0``` sub forum have child (subsubforum)
```type : 1``` sub forum does not have child (subsubforum)  
```child``` array of child ID (thread or subsubforum based on type). If ```type:0``` child is array of ```subsubforumID```, else child is an array of ```threadID```.  

### Subforum infomation
This is for Subforum page
#### Request
```json
{
    "username":"SAMPLE-USERNAME",
    "userID":"userID",
    "subforumID":"SAMPLE-ID",
    "token":"SAMPLE-token"
}
```
### Respone
```json
{
    "id":"SAMPLE-ID",
    "title":"SAMPLE-TITLE",
    "description":"SAMPLE-DES",
    "user-following-state":true,
    "follower":"SAMPLE-NUMBERFOLLOWER",
    "type":0,
            "child":[
                "SAMPLE-CHILD-ID",...
            ]
}
```
```type : 0``` sub forum have child (subsubforum)
```type : 1``` sub forum does not have child (subsubforum)  
```child``` array of child ID (thread or subsubforum based on type). If ```type:0``` child is array of ```subsubforumID```, else child is an array of ```threadID```.  
  
### Thread information
This is for Home/Subforum/Thread page

#### Request
```json
{
    "username":"SAMPLE-USERNAME",
    "userID":"userID",
    "threadID":"SAMPLE-ID",
    "token":"SAMPLE-token"
}
```
### Respone
```json
{
    "id":"SAMPLE-ID",
    "title":"SAMPLE-TITLE",
    "thumbnail":"SAMPLE-THUMBNAILURL",
    "tag":"SAMPLE-TAG",
    "child":[
        "SAMPLE-CHILD-POST-ID",...
    ]
}
```

### Post information
This is for Thread page

#### Request
```json
{
    "username":"SAMPLE-USERNAME",
    "userID":"userID",
    "postID":"SAMPLE-ID",
    "token":"SAMPLE-token"
}
```
### Respone
```json
{
    "id":"SAMPLE-ID",
    "title":"SAMPLE-TITLE",
    "userpost":"SAMPLE-THUMBNAILURL",
    "user-vote-state":true,
    "vote-number":"1000",
    "child":[
        "SAMPLE-CHILD-POST-ID",...
    ]
}
```
### Add Thread page
### Subforum
#### request
```json
{
   "subforumID":"SAMPLE-SUBFORUM-ID"
}
```
#### respone
```json
{
   "subforum":[
    {
        "subforumID":"SAMPLE-ID",
        "subforumName":"SAMPLE-NAME"
     },
     ...
   ]
}
```
### Tag
#### respone
```json
{
    "tags":[
        {
            "tagID":"SAMPLE-ID",
            "tagName":"TAG NAME"
        },
        ...
    ]
}
```


## 3.Sidebar
### Newest post
This will be discuss in group meeting

### Recent activity
This will be discuss in group meeting

### Billboard
This will be discus in group meeting


## POST
### 1 Registration
This will be discuss in group meeting

### 2. Add Thread
```json
{
    "username":"username",
    "userID":"userID",
    "token":"token",
    "title":"thread-title",
    "tag":"thread-tag",
    "content":"content",
    "subForumID":"subforumID"
}
``` 
### 3. Add Subforum
```json
{
    "username":"username",
    "userID":"userID",
    "token":"token",
    "title":"subforum-title",
    "description":"description",
    "pid":"pid"
}
``` 


### 4. Add Post (as comment)
#### SEND
```json
{
    "username":"username",
    "userID":"userID",
    "token":"token",
    "threadID":"thread id",
    "pid":"pid",
    "content":"content"
}
```


# Search
