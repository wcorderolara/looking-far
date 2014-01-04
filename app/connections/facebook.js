var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

var facebookConnection = function (app){
	console.log('facebookConnection is load');

	passport.use(new FacebookStrategy({
			clientID: '340114766126931',
			clientSecret : 'd133267b60216f70fe252e2c630c601b',
			callbackURL: '/auth/facebook/callback'
		},

		function (accessToken, refreshToken, profile, done){
			debugger;
			//console.log(profile);

			done(null, profile);
		}

	));

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/app',
				failureRedirect : '/'
			}));

};

module.exports = facebookConnection;