
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
	testWeb_root: function (test) {
		//http get request
		this.req(this.host, function (error, response, body) {
			test.expect(2);
			test.equals(error, null); //no error response from host
			test.equals(response.statusCode, 200); //http status of 200
			console.log("root: " + response.statusCode);
			test.done();
		});
	},
	testWeb_mainpage: function (test) {
		//http post request
		this.req.post(this.host+'/login', {
			form : {
				email : 'hello@world.com',
				password : 'node'
			}
		}, function optionalCallback (err, httpResponse, body) {
			test.expect(3);
			test.equals(err, null);
			test.equals(httpResponse.statusCode, 302);
			test.equals(body, 'Moved Temporarily. Redirecting to /mainpage');
			console.log("mainpage: " + httpResponse.statusCode);
			test.done();
		});
	},
	testWeb_profile: function (test) {
		
		var host = this.host;
		var request = this.req.defaults({jar: true});
		
		//http post request to login
		request.post(this.host+'/login', {
			form : {
				email : 'hello@world.com',
				password : 'node'
			}
		}, function optionalCallback (err, httpResponse, body) {
			test.expect(5);
			test.equals(err, null);
			test.equals(httpResponse.statusCode, 302);
			test.equals(body, 'Moved Temporarily. Redirecting to /mainpage');
			
			request.get(host+'/profile', function (error, response, body){
				//console.log(response.request.href);
				test.equals(err, null);
				test.equals(response.statusCode, 200);
				console.log("profile: " + response.statusCode);
				test.done();
			});
		});
	}
};