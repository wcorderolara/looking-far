var models = require('./models'),
    move     = require('file-move'),
    path   = require('path'),
    crypto = require('crypto'),
    format = require('util').format,
    magick = require('imagemagick'),
    easyimg = require('easyimage'),
	Schema = models.Schema;


/* Esto deberia ir en un archivo de configuracion */
var DIR_STATIC_IMAGE = path.join(__dirname, '../../public/img/posts/');

var postSchema = Schema({
    id       : {type: String},
	photo    : {type: String},
	usermail : {type: String, unique: true},
	username : {type: String},
	userage  : {type: String},
	usercity : {type: String},
	usercountry : {type: String},
	userfear : {type: String},
	useraspiration : {type: String},
	userregreat : {type: String},
	postdate : {type: Date, default: Date.now},
    socialog : {type: Number},
    postActive : {type: Number},
    reminduser : {type:String}
});

function randomHash(str) {
    var hash = (Math.random().toString(16).slice(2) + Date.now().toString() + str);
    return crypto.createHash('sha256').update(hash).digest('hex');
}

postSchema.methods.uploadImage = function (imageObj, next) {
    var doc       = this;
    var type      = imageObj.type.split('/')[1];
    var nameImage = randomHash([doc.get('name'), imageObj.name].join(''));
    nameImage     = format('%s.%s', nameImage, type);
    var dest      = path.join(DIR_STATIC_IMAGE, nameImage);
    var newImage  = imageObj;

    move(imageObj.path, dest, function (err) {
        if ( err ) { return next(err); }

        doc.set('photo', nameImage);
        doc.save(function ( err ) {
            next(err);
        });
    });
};

var Post = models.model('post', postSchema);

module.exports = Post;
