// post_controller.js
const db = require("../db");

exports.thread_get_by_id = function(req, res) {
  var id = req.params.thread_id;
  console.log(req.params.thread_id);
  //db.query('SELECT * FROM thread;').then(res => console.log("inserted")).catch(e => console.error(e.stack))

  db.query(
    `WITH thread_details AS(
        SELECT t.id,t.title,t.thumbnail,tag.name AS tag
        FROM thread t
        LEFT JOIN tag 
        ON t.tag_id = tag.id
        WHERE t.id = 1
        GROUP BY (t.id,t.title,t.thumbnail,tag.name)
    )
    SELECT td.*, string_agg(p.id::character varying, ',') AS child
    FROM thread_details td
    LEFT JOIN post p
    ON td.id = p.threadid
    GROUP BY (td.id,td.title,td.thumbnail,td.tag);`,
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
