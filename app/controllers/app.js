var Post = require('../models/post'),
	_ = require('underscore'),
	fs = require('fs');

var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();

var appController = function(app){
	console.log('appController is load');

	var isLogged = function (req,res,nest){
		if(!req.isAuthenticated()){
			res.redirect('/test');
			return;
		}
	};

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


	//POST SOCIAL LOG IN

	app.get('/app-social', function (req,res){
		if(!req.isAuthenticated()){
			res.render('app');
		}else{
			res.render('app-social',{
				login : true,
				user 	: req.session.passport.user.displayName,
				picture	: req.session.passport.user.photos[0].value
			});
		}
	});

	app.post('/social-post', function (req,res){
		console.log('doing request');
		console.log(req.body);

		var social = new Post({
			photo : req.body.picture,
			usermail : req.body.email,
			username : req.body.name,
			userage : parseInt(req.body.age, 10),
			usercity : req.body.city,
			usercountry : req.body.country,
			userfear : req.body.fear,
			useraspiration : req.body.aspiration,
			userregreat : req.body.regreat,
			socialog : 1
		});

		social.save(function (err) {
            if (err) {
            	console.log('error');
                console.log(err);
                //res.send(500);
                return;
            }else{
            	res.redirect('/test');
            }
        });
	});

	//POST NORMAL

	app.get('/app', function (req,res){
		res.render('app');
		/*if(!req.isAuthenticated()){
			res.render('app');
		}else{
			//debugger;
			res.render('app',{
				login : true,
				user : req.session.passport.user.displayName,
				picture : req.session.passport.user.photos[0].value
			});	
		}*/
	});

	app.post('/post-far', multipartMiddleware, function (req,res){
		//debugger;
		var post = new Post({
			usermail : req.body.email,
			username : req.body.name,
			userage : parseInt(req.body.age),
			usercity : req.body.city,
			usercountry : req.body.country,
			userfear : req.body.fear,
			useraspiration : req.body.aspiration,
			userregreat : req.body.regreat,
			socialog : 0
		});

		
        post.save(function (err) {
        	//debugger;
            if (err) {
                console.log(err);
                res.send(500);
                return;
            }

            post.uploadImage(req.files.photo, function (err) {
                if (err) {
                    res.send(500);
                    return;
                }
                
            });

        });
        res.redirect('/test');
	});
};

module.exports = appController;
