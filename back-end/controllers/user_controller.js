// user_controller.js 
const db = require("../db");

exports.user_details_get = function(req, res) {
    var user_id = req.params.user_id;
    var values = [user_id];
    db.query(
        `SELECT username, avatar, point, g.type AS gender, address,phone, description, birthday
        FROM public.user u
        LEFT JOIN gender g
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

exports.user_delete = function(req, res) {
  if (!req.isAuthenticated()) {
    // guest cannot delete account
    res.status(403).send({"message":"Guest cannot delete user account"});
  } 
  else if (req.session.passport.user.role == "Admin"){
    deleteAccount(req, res);
  } else if (req.session.passport.user.role == "User" && req.session.passport.user.username == req.params.username){
    // Moderator is not allowed to delete user account
    // Role User. 
    // Only the owner can delete!
    deleteAccount(req, res);
  } else {
    res.status(403).send({"message":"You cannot delete this user account"});
  }
};

exports.user_update = function(req, res) {
  if (!req.isAuthenticated()) {
    // guest cannot update threads
    res.status(403).send({"message":"Guest cannot update user account"});
  } 
  else if (req.session.passport.user.role == "User"){ //&& req.session.passport.user.username == req.params.username){
    // Moderator is not allowed to update user account
    // Role User. 
    // Only the owner can update!
    updateAccount(req, res);
  } else {
    res.status(403).send({"message":"You cannot update this user account"});
  }
};



function deleteAccount(req, res) {
  var username = req.params.username;
  db.query(
    `
    DELETE FROM public.user where username= $1;
    `,
    [username],
    (err) => {
      if (err) {
        res.status(400).send({"message":"Error occured during deletion"});
      } else {
        res.status(200).send({"message":"Delete user successfully"});
      }
    }
  );
}

function updateAccount(req, res) {
  var id = req.session.passport.user.id;
  let gender_id = req.body.gender == "Male"? "1":"2";
  console.log(req.body);
  console.log(gender); 
  db.query(
    `
    UPDATE public.user SET (AVATAR, gender_id, address, phone, description, birthday)
    VALUES ($1, $2, $3, $4, $5, $6) WHERE public.user.id = $7;
    `,
    [req.body.avatar, gender_id, req.body.address, req.body.phone, req.body.description, req.body.birthday, id],
    (err) => {
      if (err) {
        res.status(400).send({"message":"Error occured during update account"});
      } else {
        res.status(200).send({"message":"Update user successfully"});
      }
    }
  );
}
