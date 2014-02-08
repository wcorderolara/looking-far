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

	app.delete('/panel/delete/:id', function (req,res){
		//debugger;
		console.log('deleting post with id: ' + req.params.id);

		Post.remove( { id : req.params.id }, function (err,post){
			if(!err){
				console.log('post remove');
				return res.send('');
			}else{
				console.log(err);
			}
		});

		res.render('panel');

	})

};

module.exports = panelController;