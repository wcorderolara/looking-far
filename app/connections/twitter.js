var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');

var twitterConnection = function (app){
	console.log('twitterConnection is load');
		
	passport.use( new TwitterStrategy({
			consumerKey :'QJpbYDtC9GFpeVD3sh6HFw',
			consumerSecret :'Ta9xNWMmhBhzqflCMcXKwfVA3ZUiPU8yOw3SYx5bcE',
			callbackURL: '/auth/twitter/callback'
		},
		function (token, tokenSecret, profile, done){
			//debugger;
			console.log(profile);

			var user = new User({
				username : profile.username,
				twitter : profile
			});

			user.save(function(err){
				//debugger;
				if(err){
					done(err,null);
					return;
				}
				done(null, profile);	
			});
		}));

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter',
		{ successRedirect: '/app', failureRedirect: '/?error=something-happend' }));
};

module.exports = twitterConnection;
