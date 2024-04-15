// modules
var express = require('express'); 
var http = require('http'); 
var path = require('path'); 
var nodemailer = require('nodemailer'); 

// initializing variables to manipulate
var app = express();
var server = http.Server(app);
var port = 3000;

// set to port 3000
app.set("port", port);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "index.html")));

// response with html in "/"
app.get("/", function(req, response) {
  response.sendFile(path.join(__dirname, "index.html"));
});

// post method to send the message
app.post("/send_email", function(req, response) {
  var to = req.body.to;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email', 
      pass: 'your_password' 
    }
  });

  var mailOptions = {
    to: to,
    subject: subject,
    text: message
  };

  // error handling
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error); 
    } else {
      console.log("Email Sent: " + info.response); 
    }
    response.redirect("/"); 
  });
});

// port listener
server.listen(port, function() {
  console.log("Server running on port: " + port);
});

