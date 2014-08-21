var win = require('winston'); //logging

module.exports = {
	require : function(req, res, next){
		if(!req.isAuthenticated()){
			req.session.messages = "Login required";
			res.redirect('/');
		} else {
			req.session.messages = "";
			next();
		}
	},
	logout : function(req, res){
		if(req.isAuthenticated()){
			//console.log(req.user);
			win.info(req.user + ' has successfully logout');
			req.session.messages = "Log out successfully";
			req.logout();
		}
		res.redirect('/'); //back to root
	}
};
