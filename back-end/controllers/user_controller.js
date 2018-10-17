// user_controller.js 
const db = require("../db");

exports.user_details_get = function(req, res) {
    var user_id = req.params.user_id;
    var values = [user_id];
    db.query(
        `SELECT username, avatar, point, g.type AS gender, address,phone, description, birthday
        FROM public.user u
        INNER JOIN gender g
        ON u.gender_id = g.id
        WHERE u.id = ($1)`, 
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

exports.user_summary_get = function(req, res) {
    var user_id = req.params.user_id;
    var values = [user_id];
    db.query(
        `SELECT avatar, username, point, r.name 
        AS role FROM public.user u 
        INNER JOIN user_role r 
        ON u.role_id = r.id 
        WHERE u.id = $1`,
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

