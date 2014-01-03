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
	})

	app.get('/app', function (req,res){
		res.render('app');
	})

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