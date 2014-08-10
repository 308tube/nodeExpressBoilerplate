	
(function(){
	
	var passport = require('passport') //authentication module
		, LocalStrategy = require('passport-local').Strategy //authentication sub-module
		, winston = require('winston'); //logging
	
	//authentication logic
	passport.use(new LocalStrategy({
			//set the field name here
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			
			console.log(email);
			console.log(password);
			
			//temp code for now
			if(email === 'hello@world.com' && password === 'node') {
				winston.info(email + ' has successfully login');
				return done(null, email);
			} else {
				winston.info(email + ' failed to login');
				return done(null, false, { message: 'Incorrect email and or password' });
			}
			
			winston.error('System error, user ' + email + ' did not authenticate');
			return done(null, false, { message: 'Incorrect email and or password' });
			
		}
	));
	
	//used to keep session state
	passport.serializeUser(function(email, done) {
		//console.log("serializeUser");
		done(null, email);
	});
	
	//used to keep session state
	passport.deserializeUser(function(email, done) {
		//console.log("deserializeUser");
		done(null, email);
	});
	
})();