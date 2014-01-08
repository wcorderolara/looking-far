var passport = require('passport');

var homeController =  function (app){
	console.log("homeController load");

	//var isntLoggedIn = function (req, res, next){
		//debugger;
		//if(!req.session.user){
		//	res.redirect('/');
		//	return;
		//}

		//next();
	//};

	/*var isLoggedIn = function (req, res, next){
		if(req.session.user){
			res.redirect('/app');
			return;
		}

		next();
	};*/

	app.get('/', function (req, res){
		res.render('index');
	});

	app.get('/test', function (req,res){
		res.render('test');
	});

	app.get('/app', function (req,res){
		res.render('app');
	});

	app.get('/about', function(req,res){
		res.render('about');
	});

	app.get('/buy', function(req,res){
		res.render('buy');
	});

	app.get('/connections', function(req,res){
		res.render('connections');
	});

	app.get('/contact', function(req,res){
		res.render('contact');
	});

	//home block
	app.get('/maria', function (req, res){
		res.render('maria');
	});
	
	app.get('/lee', function (req, res){
		res.render('lee');
	});
	
	app.get('/josette', function (req, res){
		res.render('josette');
	});
	
	app.get('/victor', function (req, res){
		res.render('victor');
	});

	//end home block

	//about block
	app.get('/kid', function (req, res){
		res.render('kid');
	});
	
	app.get('/jake', function (req, res){
		res.render('jake');
	});
	
	app.get('/brett', function (req, res){
		res.render('brett');
	});
	
	app.get('/airmen', function (req, res){
		res.render('airmen');
	});
	//end about block

	//connections block
	app.get('/wesley', function (req, res){
		res.render('wesley');
	});
	
	app.get('/danielle', function (req, res){
		res.render('danielle');
	});
	
	app.get('/nolane', function (req, res){
		res.render('nolane');
	});
	
	app.get('/lindsay', function (req, res){
		res.render('lindsay');
	});
	//end connections block

	//contact block
	app.get('/laura', function (req, res){
		res.render('laura');
	});
	
	app.get('/steve', function (req, res){
		res.render('steve');
	});
	
	app.get('/jennifer', function (req, res){
		res.render('jennifer');
	});
	
	app.get('/wilton', function (req, res){
		res.render('wilton');
	});
	//end contact block

	app.get('/auth/facebook', passport.authenticate( 'facebook', { scope:'read_stream' } ) );

	app.post('/log-in', function (req, res){
		users.push(req.body.username);
		req.session.user = req.body.username
		server.io.broadcast('log-in', {username : req.session.user});
		res.redirect('/app');
	});

	app.get('/log-out', function (req, res){
		users = _.without(users,req.session.user);
		req.session.destroy();
		res.redirect('/');
	})
};

module.exports = homeController;