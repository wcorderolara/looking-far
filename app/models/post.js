var models = require('./models'),
	Schema = models.Schema;


var postSchema = Schema({
	photo    : {type: String},
	usermail : {type: String, unique: true},
	username : {type: String},
	userage  : {type: Number},
	usercity : {type: String},
	usercountry : {type: String},
	userfear : {type: String},
	useraspiration : {type: String},
	userregreat : {type: String},
	postdate : {type: Date, default: Date.now}
});

var Post = models.model('post', postSchema);

module.exports = Post;