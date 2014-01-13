var express  = require('express.io'),
	swig 	 = require('swig'),
	_ 		 = require('underscore'),
	passport = require('passport');
//var RedisStore = require('connect-redis')(express);
var app = express();

app.http().io();

var users = [];
var login,
	user,
	picture;

swig.setDefaults({
	cache:false
});

//Templates and Views Settings
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './app/views');

// Post, Cookies and Sessions Settings
app.configure(function(){
	//Static files load
	app.use(express.static('./public'));
	
	app.set('view cache', false);
	app.use(express.logger());
	app.use(express.cookieParser());
	//app.use(express.bodyParser());
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(express.session({ secret: 'SECRET' }));
    app.use(express.session({ secret: 'SECRET' }));
    app.use(passport.initialize());
    app.use(passport.session());
});

//authentication
passport.serializeUser(function (user, done){
	done(null,user);
});

passport.deserializeUser(function (obj, done){
	done(null,obj);
});

//Controllers

var homeController = require('./app/controllers/home');
var appController = require('./app/controllers/app');
var mailController = require('./app/controllers/mail');

homeController(app);
appController(app);
mailController(app);

//Connections
var twitterConnection = require('./app/connections/twitter');
var facebookConnection = require('./app/connections/facebook');
twitterConnection(app);
facebookConnection(app);

var port = process.env.PORT || 3000;

app.listen(port, function (){
	console.log("Listening on " + port);
});
console.log('app running');
