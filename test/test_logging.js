module.exports = {
	setUp: function (callback) {
		this.ready = 'captain';
		callback();
	},
	tearDown: function (callback) {
		// clean up
		this.ready = null;
		callback();
	},
	info: function (test) {
		console.log("Test logging to file and database");
		
		test.equals(this.ready, 'captain');
		test.done();
	},
	/*
	 * test winston logging module
	 */
	testLogging: function (test) {
		var win = require('winston');
		
		require('./../lib/logger.js');
		
		win.info('nodeunit test case, testing logging', {
			userid: "nodeunit",
			activity: "test_logging.js"
		});
		
		test.expect(1);
		test.ok(true, 'logging without errors');
		test.done();
	}
};