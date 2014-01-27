var nodemailer = require('nodemailer');
var error;

var mailController = function (app){
	console.log('mail Controller Aplication load');

	app.post('/send-mail', function (req,res){
		//debugger;
		var transport = nodemailer.createTransport("SMTP", {
			 host : "hs15.name.com",
			 secureConnection: true,
			 port : 465,
			 auth : {
			 	user : "info@looking-far.com",
			 	pass : "LookingFar14"
			 }
		});
		
		var mailOptions = {
			from 	: req.body.email, //email variable
			to 		: "info@looking-far.com", //mails to send
			subject : "Contact mail", //subject mail
			text	: "Looking-FAR Contact Form", //plaintext body
			html 	: "<p>" + req.body.comment + " <br><br> Thank You!</p><p>" + req.body.name + ", " + req.body.country + "</p>"
		};

		transport.sendMail(mailOptions, function (err, res){
			error = err;
			if(err){
				console.log(err);
			}else{
				console.log("message sent: " + res.message);
				//res.redirect('/test');
			}
		});

		if(!error){
			res.redirect('/contact');
		}
	});
}

module.exports = mailController;