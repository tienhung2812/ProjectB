 var nodemailer = require('nodemailer');

 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ridehubteam@gmail.com',
    pass: 'rideHub123@'
  }
});
var link = 'https://google.com'
var mailOptions = {
  from: 'ridehubteam@gmail.com',
  to: 'peter.phatvo@gmail.com',
  subject: 'Reset your RideHub Forum account',
  text: `We have received a request from you to reset your password for RideHub Forum account.
         If you really wish to reset your password. Follow the link below:
        `+ link + 
        `If you don't wish to reset your password, disregard this email.
         The RideHub Team,
         https://ride-hub.herokuapp.com
        `
    };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 