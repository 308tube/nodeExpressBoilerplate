/**
 * Module dependencies.
 */
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, mainpage = require('./routes/mainpage')
	, profile = require('./routes/profile')
	, http = require('http')
	, path = require('path')
	, winston = require('winston') //logging
	, passport = require('passport') //authentication module
	, crypto = require('crypto') //create a random string for session
	, app = express(); //express framework

/**
 * app specific library dependencies
 */

//load all the logging transports, requires winston module
require('./lib/logger.js');

//authentication object for passport 
//routes that need authentication will need this
var auth = require('./lib/auth.js');

//load passport configuration
require('./lib/passportConfig.js');

/**
 * start defining environments configuration
 */
var what_env = process.env.ENV || "development"; //check what environment you are in
app.set('env', what_env);

//set environment configuration base on what environment it is deployed in
if ('production' === app.get('env')) {
	//production environment config
	app.use(express.logger());
} else if('test' === app.get('env')) {
	//test or uat environment config
	app.use(express.logger());
} else {
	//dev environment config
	app.use(express.logger('dev')); //log to console
	app.use(express.errorHandler());
}

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());

/*
 * static files file images and html files
 * note: when place this far up top, passport will not track public folder
 */
app.use(express.static(path.join(__dirname, 'public')));

//environment configuration needed for passport (authentication), order does matter
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: crypto.randomBytes(20).toString('hex') })); //use random string for session secret
app.use(passport.initialize());
app.use(passport.session());

/*
 * http://stackoverflow.com/questions/8378338/what-does-connect-js-methodoverride-do
 * 
 * If you want to simulate DELETE and PUT, methodOverride is for that.
 * If you pass in the _method post parameter set to 'delete' or 'put', 
 * then you can use app.delete and app.put in Express instead of using 
 * app.post all the time (thus more descriptive, verbose):
 */
app.use(express.methodOverride());
app.use(app.router);

/**
 * start defining routes
 * to add authentication, all the auth.require function as the 2nd parameter
 */

//web-page routings
app.get('/', routes.index);
app.get('/profile', auth.require, profile.index);
app.get('/mainpage', auth.require, mainpage.index); //auth object used here to secure page
app.get('/logout', auth.logout); //route to auth object to logout

//api POST resource
app.post('/login', passport.authenticate('local', {successRedirect: '/mainpage', failureRedirect: '/?code=401' }));

//api GET resource routing
var api_v1 = "/api/v1";
app.get(api_v1 + '/users', auth.require, user.list);

/**
 * start web server
 */
http.createServer(app).listen(app.get('port'), function() {
	//console.log('Express server listening on port ' + app.get('port'));
	winston.info('Express server started', {
		port: app.get('port'),
		env: app.get('env')
	});
});
