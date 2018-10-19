// post_controller.js
const db = require("../db");

function removePost(req,res) {
  var query = req.params;
  const text = `DELETE FROM post where id = $1`;
  const values = [query.post_id];
  db.query(text, values, (err) => {
    if (err) {
        res.status(400).send({"message": "Delete post failed"});
    } else {
        res.status(200).send({"message": "Delete post successful"});
    }
  });     
}

function updatePost(req, res) {
  var query = req.params;
  var query2 = req.body;
  const text = `UPDATE post
    SET content=$2
    WHERE id = $1`;
  const values = [query.post_id, query2.content];
  db.query(text, values, (err) => {
    if (err) {
      res.status(400).send({"message":"Update failed!"});
    } else 
      res.status(200).send({"message":"Update successfully!"});
  })
}

// Get Post - Anyone can get posts
exports.post_get = function(req, res) {
  console.log(req.session);
  if (!req.isAuthenticated()) {
    // guest cannot see whether he voted this post or not
    // also whether whether he followed this sub-forum
    //res.send("to do!");
    var post_id = req.params.post_id;
    var values = [post_id];
    db.query(`WITH post_withuser AS(
              SELECT p.id,p.creation_date,u.username,u.avatar AS user_post
              FROM post p
              LEFT JOIN public.user u
              ON p.userid = u.id
			        WHERE p.id = $1
          ), post_withvote AS (
              SELECT pu.*, COUNT(pv.userid) AS vote_number
              FROM post_withuser pu
              LEFT JOIN post_votes pv
              ON pu.id = pv.postid
              GROUP BY(pu.id,pu.user_post,pu.username,pu.creation_date)
          )
          SELECT pv.*, p.content
          FROM post_withvote pv
          INNER JOIN post p
          ON pv.id = p.id;`
          ,values
          ,(err,data)=>{
            try {
              res.json(data.rows[0]);
            } catch (e) {
              console.log(e);
              res.status(400).send("Data is not available");
            }
          });
  } else {
    //var user_id = req.query.user;
    var user_id = req.session.passport.user.id;
    var post_id = req.params.post_id;
    console.log(user_id);
    console.log(post_id);
    var values = [user_id, post_id];
    db.query(
      `WITH post_withuser AS(
              SELECT p.id,p.creation_date,u.username,u.avatar AS user_post,
              CASE WHEN pv.userid IS NULL THEN false
                  ELSE true 
                  END AS user_vote_state  
              FROM post p
              LEFT JOIN post_votes pv
              ON p.id = pv.postid AND pv.userid = $1
              LEFT JOIN public.user u
              ON p.userid = u.id
              WHERE p.id = $2
          ), post_withvote AS (
              SELECT pu.*, COUNT(pv.userid) AS vote_number
              FROM post_withuser pu
              LEFT JOIN post_votes pv
              ON pu.id = pv.postid
              GROUP BY(pu.id,pu.user_post,pu.user_vote_state,pu.username,pu.creation_date)
          )
          SELECT pv.*, p.content
          FROM post_withvote pv
          INNER JOIN post p
          ON pv.id = p.id;`,
      values,
      (err, data) => {
        try {
          res.json(data.rows[0]);
        } catch (e) {
          console.log(e);
          res.status(400).send("Data is not available");
        }
      }
    );
  }

  
};

// Everyone can create new posts except guest
exports.post_create = function(req, res) {
  if (!req.isAuthenticated()) {
    return res
      .status(403)
      .send({
        message: "Guests are not allowed to create new post. Please sign in"
      });
  } else {
    var query = req.body;    
    var post = {
      content : query.content,
      creation_date : query.creation_date,
      userid  : parseInt(query.userid),
      threadid: parseInt(query.threadid),
      pid : parseInt(query.pid)
    }
    const text = 
     "INSERT INTO post(content,creation_date,userid,threadid,pid) VALUES ($1, $2, $3, $4, $5)";
     db.query(text, [post.content, post.creation_date, req.session.passport.user.id, post.threadid, post.pid], (err, result) => {
      if (err) {
        res.status(400).send({"message":"Create post failed!"})        
      }
      else {
        res.send({"message":"Create post successfully!"})
      }
    });
  }
};



// Post delete - Require loin!
// User can only delete hist own post
// Moderator and Admin can delete any post
exports.post_delete = function(req, res) {
  if (!req.isAuthenticated()) {
    return res
      .status(403)
      .send({
        message: "Guests are not allowed to delete posts. Please sign in"
      });
  } 
  else if (req.session.passport.user.role == "Admin" || req.session.passport.user.role == "Moderator"){
    // Admin or Moderator
    removePost(req,res);     
  } else {
    // User
    // Require check he is deleting his own post or not!
    db.query(`SELECT id, userid FROM public.post WHERE id=$1 AND userid=$2`, 
      [req.params.post_id, req.session.passport.user.id], (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          res.status(403).send({"message":"Something went wrong"});
          // res.status(400).send({"message":"error"});
        } else {
            // if query is fine
            if (result.rows.length == 0) {
              // user does not own the post with the given id
              res.status(403).send({"message":"User does not have permission to delete the post Or Post does not exist!"});
            } else {
              // user own the post, now he can delete it!
              removePost(req, res);
            }
        } 
    })
  }
};

// Update existing post
exports.post_update = function(req, res) {
  if (!req.isAuthenticated()) {
    return res
      .status(403)
      .send({
        message: "Guests are not allowed to update posts. Please sign in"
      });
  } 
  else if (req.session.passport.user.role == "Admin" || req.session.passport.user.role == "Moderator"){
    // Admin or Moderator
    updatePost(req,res);     
  } else {
    // Check whether user is the owner of the post
    db.query(`SELECT id, userid FROM public.post WHERE id=$1 AND userid=$2`, 
    [req.params.post_id, req.session.passport.user.id], (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(403).send({"message":"Something went wrong"});
        // res.status(400).send({"message":"error"});
      } else {
          // if query is fine
          if (result.rows.length == 0) {
            // user does not own the post with the given id
            res.status(403).send({"message":"User does not have permission to delete the post Or Post does not exist!"});
          } else {
            // user own the post, now he can delete it!
            updatePost(req, res);
          }
      } 
  })
  }
};


// Vote existing post
exports.post_vote = function(req, res) {
  var values = [];
  if (!req.isAuthenticated()) {
    return res
      .status(403)
      .send({
        message: "Guests are not allowed to unvote posts. Please sign in"
      });
  } else {
    var is_vote = req.body.is_vote;
    var vote_query = ``;
    var values = [];
    if(is_vote){
      values = [req.session.user.passport.id
        ,req.body.post_id
        ,req.body.creation_date];
      vote_query = `INSERT INTO post_votes VALUES($1,$2,$3);`;
    }else{
      values = [req.session.user.passport.id
        ,req.body.post_id];
      vote_query = `DELETE FROM post_votes WHERE userid = $1 AND postid = $2;`;  
    }
    db.query(
      vote_query,
      values,
      (err, data) => {
        try {
          res.send("action success!");
        } catch (e) {
          console.log(e);
          res.status(400).send("action failed!");
        }
      }
    );
  }
};