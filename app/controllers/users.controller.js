const User = require('../models/users.models');
const nodemailer = require("nodemailer");

function registerUser (req, res) {
    var userObj = new User(req.body);
    userObj.save().then(user => {
        if(user) {
            console.log('User registered ', user);
            // res.status(200).send(user);
        } else {
            console.log('User not registered', user);
            // res.status(404).send({error: 'not registered'});
        }
    }).catch(error => {
        console.log('Error while registering ', error);
        // res.status(400).send(error);
    });
}

exports.getUsers = (req, res) => {
    User.find().then(users => {
        if(users.length > 0) {
            console.log('Users found ');
            res.status(200).send(user);
        } else {
            console.log('Users not found');
            res.status(404).send([]);
        }
    }).catch(error => {
        console.log('Error while getting ', error);
        res.status(400).send(error);
    });
}



let transporter = nodemailer.createTransport({
    host: "mail.ibuildmywealth.com",
    name: "ibuildmywealth.com",
    port: 465,
    secure: true,
    auth: {
      user: 'raj@ibuildmywealth.com',
      pass: 'Welcome$#@!',
    },
  });

exports.sendMail = (req, res) => {

    console.log(req.body);
    var response = ``;
    if(req.body.registerType == 'register') {

        response = `Hello <b>${req.body.firstName}</b>,<br><br>
        Congratulations! You have successfully registered for the <b>I Build My Wealth</b>.<br>
        The best thing you can do now is to bookmark the webinar link at <b>${req.body.selectedDate}</b>, and to set a reminder on your calendar so you do not miss the webinar.<br>
        <ul><li><b>Link: </b> https://event.webinarjam.com/t/click/17zzruyivap16cw2zam6lczfr</li>
        <li><b>Password: </b> N/A</li></ul>
        <br>See you soon!<br>
        `
    }

    if(req.body.registerType == 'contact') {

        response = `<b>Name:</b> ${req.body.firstName}<br> <b>Email:</b> ${req.body.userEmail}<br> <b>Subject:</b> ${req.body.userSubject}<br><br>${req.body.message}`
    }

    if(req.body.registerType == 'events') {

        response = `Hello <b>${req.body.firstName}</b>,<br><br>
        Congratulations! You have successfully registered for the <b>I Build My Wealth Event</b>.<br>
        
        <br>See you soon!<br>
        `
    }

    let mailOptions = {
        from: 'raj@ibuildmywealth.com', // sender address
        to: req.body.email, //req.body.email, // list of receivers
        subject:  req.body.subject, // Subject line
        // text: "Hello world?", // plain text body
        html: response, // html body
      };

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
          res.send(err);
        }
            // registerUser(req);
          console.log("Email sent successfully", data);
          res.send({msg: "maail sent "});
        
      });
}