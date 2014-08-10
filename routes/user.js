var fsConfig = require('./../lib/fsConfig.js');

/**
 * GET users listing.
 */
exports.list = function(req, res){
	var fakeData = fsConfig.loadConfigFile('./configFiles/fakeDataStore.json'); //load config
	res.json(fakeData);
};