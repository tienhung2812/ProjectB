// post_controller.js
const db = require("../db");

exports.post_create = function(req, res) {
  var query = req.body;
  const text =
    "INSERT INTO post(content,creation_date,userid,threadid,pid) VALUES($1,$2,$3,$4,$5)";
  const values = [
    query.content,
    query.creation_date,
    query.userid,
    query.threadid,
    query.pid
  ];
  db
    .query(text, values)
    .then(res.json("Create successfully!"))
    .catch(res.json("Create failed!"));
};

exports.post_get = function(req, res) {
  var user_id = req.query.user;
  var post_id = req.params.post_id;
  console.log(user_id);
  console.log(post_id);
  var values = [user_id, post_id];
  db.query(
    `WITH post_withuser AS(
            SELECT p.id,u.avatar AS user_post,
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
            GROUP BY(pu.id,pu.user_post,pu.user_vote_state)
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
};

// Post delete
exports.post_delete = function(req, res) {
  var query = req.params;
  const text =
    `DELETE FROM post where id = $1`;
  const values = [
    query.post_id
  ];
  db
    .query(text, values)
    .then(res.json("Delete successfully!"))
    .catch(res.json("Delete failed!"));
};

// Post update
exports.post_update = function(req, res) {
  var query = req.params;
  var query2 = req.body;
  const text =
    `UPDATE post
    SET content=$2
    WHERE id = $1`;
  const values = [
    query.post_id,
    query2.content
  ];
  db
    .query(text, values)
    .then(res.json("Update successfully!"))
    .catch(res.json("Update failed!"));
};

