// user_controller.js
const db = require("../db");
const emaiAddress = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");

exports.user_details_get = function(req, res) {
  var user_id = req.params.user_id;
  var values = [user_id];
  db.query(
    `SELECT u.username, u.avatar, u.point, r.name as role, g.type AS gender,u.email,u.address,phone, u.description, u.birthday
        FROM public.user u
        LEFT JOIN gender g
        ON u.gender_id = g.id        
        inner join public.user_role r 
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

// Delete User Account
exports.user_delete = function(req, res) {
  if (!req.isAuthenticated()) {
    // guest cannot delete account
    res.status(403).send({ message: "Guest cannot delete user account" });
  } else if (req.session.passport.user.role == "Admin") {
    deleteAccount(req, res);
  } else if (
    req.session.passport.user.role == "User" &&
    req.session.passport.user.username == req.params.username
  ) {
    // Moderator is not allowed to delete user account
    // Role User.
    // Only the owner can delete!
    deleteAccount(req, res);
  } else {
    res.status(403).send({ message: "You cannot delete this user account" });
  }
};

// Update User Account - Only Owner can do!
exports.user_update = function(req, res) {
  if (!req.isAuthenticated()) {
    // guest cannot update threads
    res.status(403).send({ message: "Guest cannot update user account" });
  } /* if (req.session.passport.user.role == "User") */ else {
    //&& req.session.passport.user.username == req.params.username){
    // Moderator is not allowed to update user account
    // Role User.
    // Only the owner can update!
    updateAccount(req, res);
  }
  /*     else {
    res.status(403).send({"message":"You cannot update this user account"});
  } */
};

// Modify user role - Admin only
exports.user_modify_role = function(req, res) {
  if (req.isAuthenticated() && req.session.passport.user.role == "Admin") {
    let role = req.body.role;
    var role_id;
    switch (role) {
      case "Admin":
        role_id = "1";
        break;
      case "Moderator":
        role_id = "2";
        break;
      case "User":
        role_id = "3";
        break;
      default:
        role_id = "0";
    }
    if (role_id == 0) {
      res.status(400).send({ message: "Role doest not exists" });
    } else {
      let username = req.body.username;
      // Must check if username really exists!
      db.query(
        `UPDATE public.user SET role_id=$2 WHERE username=$1`,
        [username, role_id],
        function(err, result) {
          if (err)
            res
              .status(400)
              .send({ Message: "Error occured during modifying user role" });
          else
            res.status(200).send({ Message: "Modify user role successfully" });
        }
      );
    }
  } else {
    res
      .status(403)
      .send({ message: "You are not authourized to modify role of any users" });
  }
};

function deleteAccount(req, res) {
  var username = req.params.username;
  db.query(
    `
    DELETE FROM public.user where username= $1;
    `,
    [username],
    err => {
      if (err) {
        res.status(400).send({ message: "Error occured during deletion" });
      } else {
        res.status(200).send({ message: "Delete user successfully" });
      }
    }
  );
}

function updateAccount(req, res) {
  var id = req.session.passport.user.id;
  let gender_id = req.body.gender == "Male" ? "1" : "2";
  // console.log(req.body);
  // console.log(gender_id);
  db.query(
    `
    UPDATE public.user SET avatar = $1, 
                           gender_id = $2, 
                           address=$3, 
                           phone=$4, 
                           description=$5, 
                           birthday=$6, 
                           email=$7
      WHERE public.user.id = $8;
    `,
    [
      req.body.avatar,
      gender_id,
      req.body.address,
      req.body.phone,
      req.body.description,
      req.body.birthday,
      req.body.email,
      id
    ],
    err => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .send({ message: "Error occured during update account" });
      } else {
        res.status(200).send({ message: "Update user successfully" });
      }
    }
  );
}

exports.billboard = function(req, res) {
  db.query(
    `SELECT id,username,point FROM public.user ORDER BY point DESC LIMIT 3`,
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

exports.latest_activity = function(req, res) {
  db.query(
    `SELECT p.creation_date ,p.userid,p.username ,p.threadid::text, p.thread_title,null as forumid, null as forum_title, ' comments in thread ' as tag_activity
    FROM(
      SELECT p.*,t.title as thread_title
        FROM (
          SELECT p.*, u.username
          FROM post p
          LEFT JOIN thread t
          ON p.creation_date= t.creation_date
          LEFT JOIN public.user u
          ON p.userid = u.id 
          WHERE t.creation_date IS NULL
        ) p 
        LEFT JOIN thread t 
        ON p.threadid = t.id
    )p
    UNION ALL 
    SELECT t.creation_date,t.userid ,t.username ,t.id::text as threadid,t.title as thread_title,null as forumid, null as forum_title,' create new thread ' as tag_activity
    FROM (
      SELECT t.*, u.username
      FROM thread t
      LEFT JOIN public.user u
      ON t.userid = u.id
    ) t 
    UNION ALL 
    SELECT pv.creation_date, pv.userid,pv.username,pv.threadid::text, pv.thread_title,null as forumid, null as forum_title,' votes a post in thread' as tag_activity
    FROM (
      SELECT pv.userid, u.username, p.threadid,t.title as thread_title, pv.creation_date	
      FROM post p 
      INNER JOIN post_votes pv
      ON p.id = pv.postid
      LEFT JOIN public.user u
      ON pv.userid = u.id
      LEFT JOIN thread t
      ON p.threadid = t.id
    ) pv
    UNION ALL 
    SELECT ff.creation_date, ff.userid, ff.username, null as threadid, null as thread_title,ff.forumid::text,ff.forum_title,' follows forum ' as tag_activity
    FROM (
      SELECT ff.creation_date,ff.userid,u.username,ff.forumid,f.title as forum_title 
      FROM forum_followers ff
      LEFT JOIN public.user u
      ON ff.userid = u.id
      LEFT JOIN forum f
      ON ff.forumid = f.id
    )ff
	UNION ALL 
	SELECT f.creation_date,f.userid,f.username, null as threadid, null as thread_title, f.id::text as forumid,f.title as forum_title, ' create forum ' as tag_activity
    FROM (
		SELECT f.creation_date,f.userid,u.username,f.id,f.title
		FROM forum f
		LEFT JOIN public.user u
		ON f.userid = u.id
	)f
	ORDER BY creation_date DESC LIMIT 3;
    `,
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

// Delete User Account
exports.user_modify_password = function(req, res) {
  if (!req.isAuthenticated()) {
    // guest cannot delete account
    res
      .status(403)
      .send({ message: "Guest cannot modify user account's password" });
  } else {
    // Role User.
    // Only the owner can modify his password!!
    console.log(req.session.passport);
    const saltRounds = 10;
    let hashpassword = bcrypt.hashSync(req.body.password, saltRounds);
    db.query(
      `UPDATE public.user SET password = $1 WHERE id=$2`,
      [hashpassword, req.session.passport.user.id],
      function(err) {
        // console.log(hashpassword);
        // console.log(user.rows[0].id);
        if (err) res.status(400).send("Error");
        else {
          db.query(
            `SELECT email FROM public.user WHERE id=$1`,
            [req.session.passport.user.id],
            function(err, user) {
              // Email
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: emaiAddress,
                  pass: emailPassword
                }
              });
              var mailOptions = {
                from: "ridehubteam@gmail.com",
                to: user.rows[0].email,
                subject: "Your password has changed",
                text:
                  "This is a confirmation that the password for your account has just changed.\n\n" +
                  "The RideHub Team,\n" +
                  "https://ride-hub.herokuapp.com"
              };

              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                  
                }
              });
              // Email end
            }
          );
          res.status(200).send("Success");
          // done(user);
        }
      }
    );
    // end modify password account
  }
};
exports.notification = function(req, res) {
  values = [req.session.passport.user.id];
  db.query(
    `with user_noti as (
      SELECT cnt.noti, cnt.creation_date, cnt.threadid,cnt.forumid,$1 as userid
          FROM(
            -- create new thread
            SELECT '@'||coalesce(u.username::text, '') || ' creates new thread '||  coalesce(concat(substring(t.title from 1 for 10),'...'), '')|| ' on your followed forum '||  coalesce(f.title, '') as noti,t.creation_date, t.id::text as threadid, null as forumid
            FROM thread t
            INNER JOIN forum_followers ff
            ON t.forumid = ff.forumid AND ff.userid =  $1
            INNER JOIN forum f
            ON t.forumid = f.id 
            INNER JOIN public.user u
            ON t.userid = u.id AND t.userid <> $1
          )cnt
          UNION ALL
          SELECT vp.noti, vp.creation_date, vp.threadid,vp.forumid,$1 as userid
          FROM(
            -- vote post
            SELECT '@'||coalesce(u.username::text, '') || ' votes your post in thread ' || coalesce(concat(substring(t.title from 1 for 10),'...'), '') as noti, p.creation_date, t.id::text as threadid,null as forumid
            FROM post p
            INNER JOIN post_votes pv
            ON p.id = pv.postid 
            INNER JOIN thread t
            ON p.threadid = t.id
            INNER JOIN public.user u
            ON pv.userid = u.id
            WHERE p.userid = $1 AND pv.userid <> $1 AND p.pid IS NULL
          ) vp
          UNION ALL
          SELECT vc.noti, vc.creation_date, vc.threadid,vc.forumid , $1 as userid
          FROM(
            -- vote comment
            SELECT '@'||coalesce(u.username::text, '') || ' votes your comment in thread ' || coalesce(concat(substring(t.title from 1 for 10),'...'), '') as noti, p.creation_date, t.id::text as threadid,null as forumid
            FROM post p
            INNER JOIN post_votes pv
            ON p.id = pv.postid 
            INNER JOIN thread t
            ON p.threadid = t.id
            INNER JOIN public.user u
            ON pv.userid = u.id
            WHERE p.userid = $1 AND pv.userid <> $1 AND p.pid IS NOT NULL
          ) vc
          UNION ALL 
          SELECT cnsf.noti, cnsf.creation_date, cnsf.threadid,cnsf.forumid,$1 as userid
          FROM(
            -- creat new subforum
            SELECT '@'||coalesce(u.username::text, '') || ' creates new subforum '|| coalesce(f2.title, '')|| ' on your followed forum '|| coalesce(f.title, '') as noti,f2.creation_date, null as threadid,f.id::text as forumid
            FROM forum f
            INNER JOIN forum_followers ff
            ON f.id = ff.forumid AND ff.userid =  $1
            INNER JOIN forum f2
            ON f2.pid = f.id
            INNER JOIN public.user u
            ON f.userid = u.id
          )cnsf
           UNION ALL 
           SELECT cvp.noti,cvp.creation_date, cvp.threadid,cvp.forumid,$1 as userid
           FROM (
            SELECT '@'||coalesce(u.username::text, '') || ' comments on a thread ' || coalesce(concat(substring(t.title from 1 for 10),'...'), '') || ' that you voted' as noti, p.creation_date, p.threadid::text, null as forumid
            FROM post p
            INNER JOIN post_votes pv
            ON p.pid = pv.postid AND pv.userid = $1
            INNER JOIN public.user u
            ON p.userid = u.id
            INNER JOIN thread t
            ON t.id = p.threadid 
            WHERE p.userid <> $1
          )cvp
           UNION ALL 
           SELECT cp.noti,cp.creation_date, cp.threadid,cp.forumid,$1 as userid
           FROM (
            -- comment post
            SELECT '@'||coalesce(u.username::text, '') || ' comments on your post in ' || coalesce(concat(substring(t.title from 1 for 10),'...'), '') as noti, p.creation_date, p.threadid::text, null as forumid
            FROM post p
            INNER JOIN post pp
            ON p.pid = pp.id and pp.userid = $1
            INNER JOIN public.user u
            ON p.userid = u.id
            INNER JOIN thread t
            ON t.id = p.threadid 
            WHERE p.userid <> $1
            )cp
          ORDER BY creation_date DESC
    ) , insert_user_noti as (
    insert into user_notification(noti,userid,has_read) 
      select user_noti.noti,user_noti.userid,false from user_noti on conflict (noti,userid) do nothing
    ) select user_noti.*,user_notification.has_read 
    from user_noti 
    left join user_notification
    on user_noti.noti = user_notification.noti and user_noti.userid = user_notification.userid;    
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
};


exports.notification_read = function(req, res) {
  values = [req.session.passport.user.id
    ,req.body.notification];
  db.query(
    `UPDATE user_notification set has_read = true WHERE noti = $2 AND userid = $1;`,
    values,
    (err, data) => {
      try {
         res.send("action success!")
      } catch (e) {
        console.log(e);
        res.status(400).send("action failed!");
      }
    }
  );
};

