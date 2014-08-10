
module.exports = {
	setUp: function (callback) {
		this.ready = 'captain';
		this.req = require('request');
		this.host = 'http://localhost:3000';
		callback();
	},
	tearDown: function (callback) {
		//clean up
		callback();
	},
	info: function (test) {
		console.log("Application must be running at: http://localhost:3000/");
		test.equals(this.ready, 'captain');
		test.done();
	},
	testApi_login: function (test) {
		//http post request
		var r = this.req.post(this.host+'/login', {
			form : {
				email : 'hello@world.com',
				password : 'node'
			}
		}, function optionalCallback (err, httpResponse, body) {
			test.expect(2);
			test.equals(err, null);
			test.equals(body, 'Moved Temporarily. Redirecting to /mainpage');
			test.done();
		});
	},
	testApi_logout: function (test) {
		//http get request
		this.req.get(this.host+'/logout', function optionalCallback (err, httpResponse, body) {
			test.expect(2);
			test.equals(err, null);
			test.equals(httpResponse.statusCode, 200);
			test.done();
		});
	},
	testApi_users: function (test) {
		
		var request = this.req.defaults({jar: true});
		var host = this.host;
		
		//http post request
		request.post(this.host+'/login', {
			form : {
				email : 'hello@world.com',
				password : 'node'
			}
		}, function optionalCallback (err, httpResponse, body) {
			test.expect(6);
			test.equals(err, null);
			test.equals(httpResponse.statusCode, 302);
			test.equals(body, 'Moved Temporarily. Redirecting to /mainpage');
			
			request.get(host+'/api/v1/users', function (error, response, body){
				test.equals(err, null);
				test.equals(response.statusCode, 200);
				test.equals(typeof JSON.parse(body), 'object');
				test.done();
			});
		});
	}
};