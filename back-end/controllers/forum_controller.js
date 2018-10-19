// post_controller.js
const db = require("../db");


exports.subforum_get = function(req, res) {    
  db.query(
    `WITH forum_details AS(
	SELECT f.id, f.title, f.description, string_agg(sf.id::character varying, ',') AS child,
	CASE WHEN ff.userid IS NULL THEN false
	ELSE true
        END AS user_following_state
	FROM forum f
	LEFT JOIN forum sf
	ON f.id = sf.pid
	LEFT JOIN forum_followers ff
	ON f.id = ff.forumid AND ff.userid = 2
	WHERE f.pid = 1
	GROUP BY (f.id, f.title, f.description,ff.userid)
), forum_withtype AS(
SELECT fd.*,COUNT(ff.userid) AS followers,
CASE WHEN fd.child IS NULL THEN 1
		ELSE 0 
        END AS type  
	FROM forum_details fd
	LEFT JOIN forum_followers ff
	ON fd.id = ff.forumid
	GROUP BY (fd.id,fd.title,fd.description,fd.child,fd.user_following_state)
)
SELECT ft.id, ft.title, ft.description, ft.user_following_state, ft.followers,ft.type,
	CASE WHEN ft.type = 0 THEN ft.child
	ELSE string_agg(t.id::character varying, ',')
	END AS child
FROM forum_withtype ft
LEFT JOIN thread t
ON ft.id = t.forumid
GROUP BY (ft.id,ft.title,ft.description,ft.user_following_state,ft.followers,ft.type,ft.child);`,
    (err, data) => {
      try {
        res.json(data.rows);
      } catch (e) {
        console.log(e);
        res.status(400).send("Data is not available");
      }
    }
  );
};

exports.subsubforum_get = function(req, res) {
    var values = [req.params.subforum_id
                ,req.session.passport.user.id];   
    var getquery = ``;
    if (!req.isAuthenticated()) {
        getquery = `WITH forum_details AS(
          SELECT f.id, f.title, f.description, string_agg(sf.id::character varying, ',') AS child,
          CASE WHEN ff.userid IS NULL THEN false
          ELSE true
                END AS user_following_state
          FROM forum f
          LEFT JOIN forum sf
          ON f.id = sf.pid
          LEFT JOIN forum_followers ff
          ON f.id = ff.forumid AND ff.userid = $2
          WHERE f.id = $1
          GROUP BY (f.id, f.title, f.description,ff.userid)
        ), forum_withtype AS(
        SELECT fd.*,COUNT(ff.userid) AS followers,
        CASE WHEN fd.child IS NULL THEN 1
            ELSE 0 
                END AS type  
          FROM forum_details fd
          LEFT JOIN forum_followers ff
          ON fd.id = ff.forumid
          GROUP BY (fd.id,fd.title,fd.description,fd.child,fd.user_following_state)
        )
        SELECT ft.id, ft.title, ft.description, ft.user_following_state, ft.followers,ft.type,
          CASE WHEN ft.type = 0 THEN ft.child
          ELSE string_agg(t.id::character varying, ',')
          END AS child
        FROM forum_withtype ft
        LEFT JOIN thread t
        ON ft.id = t.forumid
        GROUP BY (ft.id,ft.title,ft.description,ft.user_following_state,ft.followers,ft.type,ft.child);`
    }else{
        getquery = `WITH forum_details AS(
          SELECT f.id, f.title, f.description, string_agg(sf.id::character varying, ',') AS child
          FROM forum f
          LEFT JOIN forum sf
          ON f.id = sf.pid
          WHERE f.id = $1
          GROUP BY (f.id, f.title, f.description)
        ), forum_withtype AS(
        SELECT fd.*,COUNT(ff.userid) AS followers,
        CASE WHEN fd.child IS NULL THEN 1
            ELSE 0 
                END AS type  
          FROM forum_details fd
          LEFT JOIN forum_followers ff
          ON fd.id = ff.forumid
          GROUP BY (fd.id,fd.title,fd.description,fd.child)
        )
        SELECT ft.id, ft.title, ft.description, ft.followers,ft.type,
          CASE WHEN ft.type = 0 THEN ft.child
          ELSE string_agg(t.id::character varying, ',')
          END AS child
        FROM forum_withtype ft
        LEFT JOIN thread t
        ON ft.id = t.forumid
        GROUP BY (ft.id,ft.title,ft.description,ft.followers,ft.type,ft.child);`;
    } 
    db.query(
      getquery,
      values,
      (err, data) => {
        try {
          res.json(data.rows);
        } catch (e) {
          console.log(e);
          res.status(400).send("Data is not available");
        }
      }
    );
	};
	
  exports.forum_create = function(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(403).send({"message":"You are not allowed to create new forum"});
    } 
    else if (req.session.passport.user.role == "Admin"){
      // only admin user can create a forum
      var query = req.body;
      const text =
        "INSERT INTO forum(pid,title,description,creation_date,userid) VALUES ($1,$2,$3,$4,$5)";
      const values = [
        query.pid,
        query.title,
        query.description,
        query.creation_date,
        query.userid
      ];
      db.query(text, values, (err, data) => {
        if (err) {
          res.status(400).send({"message":"Create failed!"})
        } else
          res.status(200).send({"message":"Create successfully!"});
      })    
    } 
    else {
      return res.status(403).send({"message":"You are not allowed to create new forum"});
    }
  };
  
// Forum delete
exports.forum_delete = function(req, res) {
  if (!req.isAuthenticated()) {
    res.status(403).send({"message":"You are not allowed to create new forum"});
  }  
  else if (req.session.passport.user.role == "Admin"){
    var query = req.params;
    const text = `DELETE FROM forum WHERE id = $1;`;
    const values = [query.forumid];
    db.query(text, values, (err, data) => {
      if (err) {
        res.status(400).send({"message": "Delete failed!"})
      } else
        res.status(200).send({"message": "Delete successfully!"});
    })
  } else {
    res.status(403).send({"message":"You are not allowed to create new forum"});
  }
};

// Forum update
exports.forum_update = function(req, res) {
    if (!req.isAuthenticated()) {
      res.status(403).send({"message":"You are not allowed to create new forum"});
    }  
    else if (req.session.passport.user.role == "Admin"){
      var query = req.body;
      var query2 = req.params;
      const text = `UPDATE forum
        SET title=$2, description=$3
        WHERE id = $1`;
      const values = [query2.forum_id, query.title, query.description];
      db.query(text, values, (err, data) => {
        if (err) {
          res.status(400).send({"message":"Update failed!"});
        } else {        
          res.status(200).send({"message":"Update successfully!"});
        }
      });
    } else {
      res.status(403).send({"message":"You are not allowed to create new forum"});
    }
  }

  exports.getpath = function(req,res){
    const values = [req.params.subforum_id];
    db.query(
      `SELECT  f.id as parent_id, f.title as parent_title,sf.id as child_id, sf.title as child_title
      FROM forum f
      LEFT JOIN forum sf
      ON f.id = sf.pid
      WHERE sf.id = $1;
      `,
    values,
    (err, data) => {
      try {
         res.json(data.rows);
      } catch (e) {
        console.log(e);
        res.status(400).send("Data is not available");
      }
    }
  );
  }