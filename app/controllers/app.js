var Post = require('../models/post'),
	_ = require('underscore'),
	fs = require('fs');

var appController = function(app){
	console.log('appController is load');
	
	var isLogged = function (req,res,nest){
		if(!req.isAuthenticated()){
			res.redirect('/test');
			return;
		}
	}

	app.get('/test', function (req,res){
		//Post.find({})
		Post.find().sort({ postdate : -1 })

		.exec(function (err, posts){
			var postJson = _.map(posts,function (post){
				return post.toJSON();
			});
			//debugger;
			res.render('test',{
				posts : postJson
			});
		});
	});

	app.get('/app', function (req,res){
		if(!req.isAuthenticated()){
			res.render('app');
		}else{
			//debugger;
			res.render('app',{
				login : true,
				user : req.session.passport.user.displayName,
				picture : req.session.passport.user.photos[0].value
			});	
		}
	});

	app.post('/post-far',function (req,res){
		
		/*fs.readFile(req.body.photo, function (err, data){
			//debugger;	
			var imageName = req.body.photo;

			if(!imageName){
				console.log("There was an error");
				res.redirect('/app');
				res.end();
			}else{
				var newPath = __dirname + '../public/img/posts/' + imageName;

				fs.writeFile(newPath, data, function (err){
					console.log(newPath);
					res.redirect('/');
				})
			}
		});*/


		var post = new Post({
			photo : req.body.picture,
			usermail : req.body.email,
			username : req.body.name,
			userage : parseInt(req.body.age),
			usercity : req.body.city,
			usercountry : req.body.country,
			userfear : req.body.fear,
			useraspiration : req.body.aspiration,
			userregreat : req.body.regreat
		});

		post.save(function(err){
			if(err){
				res.send(500, err);
			}
			res.redirect('/test');
		});
		//res.send('ya se puede publicar vamos falta poco');
	})	
};

module.exports = appController;