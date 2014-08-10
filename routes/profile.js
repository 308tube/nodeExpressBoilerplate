var win = require('winston')
	, fsConfig = require('./../lib/fsConfig.js');

exports.index = function(req, res){
	var commonValues = fsConfig.loadConfigFile('./configFiles/global.json'); //load config
	
	//values that need to be render in header partial
	var headerObj = {
			title: commonValues.title
		};
	
	//grab the partial header and render the headerObj
	res.render('header2', headerObj,  function(err, header){
		if(err) { win.error(err); }
		
		//put header into object for rendering to the rest of the page
		var indexObj = {
				partialTopHeader: header,
				title: commonValues.title
			};
		
		//render the header partial and indeObj
		res.render('profile', indexObj, function(err, html){
			if(err) { win.error(err); }
			res.send(html);
		});
	});
};