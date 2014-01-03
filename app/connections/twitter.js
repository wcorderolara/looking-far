var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

var twitterConnection = function (app){
	console.log('twitterConnection is load');
	debugger;
	
	passport.use( new TwitterStrategy({
			consumerKey :'QJpbYDtC9GFpeVD3sh6HFw',
			consumerSecret :'Ta9xNWMmhBhzqflCMcXKwfVA3ZUiPU8yOw3SYx5bcE',
			callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
		},
		function (token, tokenSecret, profile, done){
			//debugger;

			done(null, profile);
		}
	));

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter',{ successRedirect: '/app', failureRedirect: '/?error=something-happend' } ),
		function(req, res) {
	    	res.redirect('/app');
	 	}
	);

	
};

module.exports = twitterConnection;
