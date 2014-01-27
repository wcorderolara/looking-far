var Post = require('../models/post'),
	_    = require('underscore'),
	fs   = require('fs');

var panelController = function (app){
	console.log('panel Controller is Load');

	app.get('/panel', function (req,res){
		//Post.find({})
		Post.find().sort({ postdate : -1 })

		.exec(function (err, posts){
			var postJson = _.map(posts,function (post){
				return post.toJSON();
			});
			//debugger;
			res.render('panel',{
				posts : postJson
			});
		});
	});

	app.put('/panel/delete/:id', function (req,res){

		Post.findById(req.params.id, function (err,post){
			Post.postActive = 0;
			
			Post.save(function (err){
				if(!err){
					console.log('post update');
				}else{
					console.log(err);
				}
			})

		})

		res.render('panel');

	})

	/*app.delete('/panel/delete/:id', function (req,res){

		Post.findById(req.params.id, function (err,post){
			
			Post.remove(function (err){
				if(!err){
					console.log('Post Remove');
				}else{
					console.log(err);
				}
			})

		})

		res.render('panel');

	})*/

};

module.exports = panelController;