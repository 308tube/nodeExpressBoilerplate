var fs = require('fs')
	, Cryptr = require("cryptr")
	, simpleHash = require('./../lib/simpleHash.js')
	, winston = require('winston');

/**
 * Reading config files that is used throughout the application.
 * 
 * This constructor function read plain text json and json that is
 * encrypted for by cryptr
 * 
 * @param simpleHash
 * @returns
 */
function FsConfig(simpleHash) {
	try {
		if (!(this instanceof FsConfig)) {
			return new FsConfig(simpleHash);
		}
		this.simpleHash = simpleHash;
		this.savedConfigs = {};
		this.keyCode = null;
		return this;
	}
	catch(err) {
		winston.error(err);
		return null;
	}
}
FsConfig.prototype = {
	/**
	 * method to load the config file
	 * 
	 * @param fileName
	 * @returns
	 */
	loadConfigFile: function(fileName) {
		//console.log(fileName);
		var requestHash = this.simpleHash.hashCode(fileName);
		//console.log( requestHash );
		
		if(typeof this.savedConfigs[requestHash] === 'undefined') {
			var data = fs.readFileSync(fileName)
				, cryptr = null;
			try {
				//check to see if a keyCode is defined
				if(this.keyCode !== null) {
					cryptr = new Cryptr( this.keyCode );
					this.savedConfigs[requestHash] = JSON.parse( cryptr.decrypt(data) );
				} else {
					this.savedConfigs[requestHash] = JSON.parse( data );
				}
				//console.log('add config cache');
				//console.log( this.savedConfigs[requestHash] );
				return this.savedConfigs[requestHash];
			}
			catch (err) {
				winston.error('There has been an error parsing your JSON.');
				winston.error(err);
			}
		} else {
			//console.log('cached config');
			return this.savedConfigs[requestHash];
		}
	},
	/**
	 * method to save the key needed to use encryption
	 * npm module used is cryptr
	 * 
	 * @param key
	 * @returns {FsConfig}
	 */
	loadKeyCode: function(key) {
		this.keyCode = key;
		return this;
	}
};

//creates singleton function
module.exports = new FsConfig(simpleHash);

/**
 * examples of using this library, copy and past to another location to
 * run the code below
 */
/*
//load library that can read json files
//note: these two lines are not needed, remove once you understand the code
var fsConfig = require('./lib/fsConfig.js');
console.dir(fsConfig.loadConfigFile('./configFiles/global.json'));
*/

/*
//example with encryption module (cryptr)
//note: you can not run both at the same time since node will cache fsConfig.js
//will require the example1.json file
var example1 = require('./lib/fsConfig.js');
example1.loadKeyCode('g6518n6h4g3ghf564fmgh48');
console.dir(example1.loadConfigFile('./configFiles/example1.json'));
*/