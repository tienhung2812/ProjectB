// post_controller.js
const db = require("../db");

exports.thread_get_by_id = function(req, res) {
  var id = req.params.thread_id;
  console.log(req.params.thread_id);
  //db.query('SELECT * FROM thread;').then(res => console.log("inserted")).catch(e => console.error(e.stack))
  values = [id];
  db.query(
    `WITH thread_details AS(
        SELECT t.id,t.title,t.thumbnail,tag.name AS tag
        FROM thread t
        LEFT JOIN tag 
        ON t.tag_id = tag.id
        WHERE t.id = $1
        GROUP BY (t.id,t.title,t.thumbnail,tag.name)
    )
    SELECT td.*, string_agg(p.id::character varying, ',') AS child
    FROM thread_details td
    LEFT JOIN post p
    ON td.id = p.threadid
    GROUP BY (td.id,td.title,td.thumbnail,td.tag);`,
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

exports.thread_create = function(req, res) {
  var query = req.body;
  const text =
    "INSERT INTO thread(title,userid,forumid,creation_date,thumbnail,tagid,content) VALUES($1,$2,$3,$4,$5,$6,$7)";
  const values = [
    query.title,
    query.userid,
    query.forumid,
    query.creation_date,
    query.thumbnail,
    query.tagid,
    query.content
  ];
  pool
    .query(text, values)
    .then(res => console.log("inserted"))
    .catch(e => console.error(e.stack));
  res.send("Post");
};

exports.thread_delete = function(req, res) {
  var query = req.body;
  const text =
    `DELETE FROM post where threadid = $1;
    DELETE FROM thread where id = $1`;
  const values = [
    query.thread_id
  ];
  pool
    .query(text, values)

    .then(res => console.log("deleted"))
    .catch(e => console.error(e.stack));
  res.send("Delete");
};

exports.thread_update = function(req, res) {
  var query = req.body;
  const text =
    `UPDATE thread
    SET title=$2, thumbnail=$3, tagid=$4, content=$5
    WHERE id = $1`;
  const values = [
    query.thread_id,
    query.title,
    query.thumbnail,
    query.tagid,
    query.content
  ];
  pool
    .query(text, values)
    .then(res => console.log("updated"))
    .catch(e => console.error(e.stack));
  res.send("Update");
};


