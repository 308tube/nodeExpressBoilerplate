module.exports = {
	setUp: function (callback) {
		this.ready = 'captain';
		this.fs = require('fs');
		callback();
	},
	tearDown: function (callback) {
		// clean up
		this.ready = null;
		this.fs = null;
		callback();
	},
	info: function (test) {
		console.log("Test to make sure config file design is working");
		
		test.equals(this.ready, 'captain');
		test.done();
	},
	/*
	 * test the simpleHash module
	 */
	testHash: function (test) {
		var simpleHash = new require('./../lib/simpleHash.js');
		var testHash = simpleHash.hashCode("Test hash");
		
		test.expect(1);
		test.equals(765302716, testHash);
		test.done();
	},
	/*
	 * test to see if globalValues.json file exist
	 */
	testFile_globalValues: function (test) {
		var globalValues = this.fs.readFileSync('./configFiles/global.json');
		
		test.expect(2);
		test.ok(true, 'if readFileSync does not error, json file exist');
		test.equals(typeof {}, typeof globalValues);
		test.done();
	},
	/*
	 * test FsConfig method
	 */
	testLib_fsConfig: function (test) {
		var fsConfig = require('./../lib/fsConfig.js');
		var commonValues = fsConfig.loadConfigFile('./configFiles/global.json');
		
		test.expect(1);
		test.equals(typeof {}, typeof commonValues);
		test.done();
	}
};