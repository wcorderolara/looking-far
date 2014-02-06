var Post = require('../models/post'),
	_    = require('underscore'),
	uuid = require('uuid'),
	fs   = require('fs');

var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();

var appController = function(app){
	console.log('appController is load');

	var isLogged = function (req,res,nest){
		if(!req.isAuthenticated()){
			res.redirect('/');
			return;
		}
	};

	app.get('/', function (req,res){
		Post.find().sort({ postdate : -1 })
		.exec(function (err, posts){
			var postJson = _.map(posts,function (post){
				return post.toJSON();
			});
			res.render('index',{
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

	app.post('/social-post',multipartMiddleware, function (req,res){
		console.log('doing request');
		//console.log(req.body);
		var social = new Post({
			id : uuid.v1(),
			photo : req.body.picture_social,
			usermail : req.body.email_social,
			username : req.body.name_social,
			userage :  req.body.age_social,
			usercity : req.body.city_social,
			usercountry : req.body.country_social,
			userfear : req.body.fear_social,
			useraspiration : req.body.aspiration_social,
			userregreat : req.body.regreat_social,
			socialog : 1,
			postActive : 1,
			reminduser : req.body.chkSocial
		});

		social.save(function (err) {
            if (err) {
            	console.log('error');
                console.log(err);
                //res.send(500);
                return;
            }else{
            	res.redirect('/');
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
		var post = new Post({
			id : uuid.v1(),
			usermail : req.body.email,
			username : req.body.name,
			userage :  req.body.age,
			usercity : req.body.city,
			usercountry : req.body.country,
			userfear : req.body.fear,
			useraspiration : req.body.aspiration,
			userregreat : req.body.regreat,
			socialog : 0,
			postActive : 1,
			reminduser : req.body.chkNormal
		});

		
        post.save(function (err) {
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
        res.redirect('/');
	});
};

module.exports = appController;
