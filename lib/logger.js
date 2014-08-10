/**
 * A multi-transport async logging library for node.js
 * 
 * https://github.com/flatiron/winston
 */
(function(){
	
	var win = require('winston'); //logging
	
	win.add(win.transports.File, {
		filename: './logs/app.log',
		maxsize: 5000000,
		maxFiles: 10,
		handleExceptions: false //in test and prod, you probably want this to be true
	});
	
	/**
	 * Check out the github winston for pre-made custom transports
	 * 
	 * https://github.com/flatiron/winston#loggly-transport
	 * https://github.com/flatiron/winston#riak-transport
	 * https://github.com/flatiron/winston#mongodb-transport
	 * 
	 * ... and the list continues on
	 * 
	 * below is how to log to your own custom transport
	 */
	
	/*
	//code below is to implement custom logging to MS SQL server
	//you will need to "npm install mssql --save"
	var sql = require('mssql') //MicroSoft SQL Server
		, util = require('util') //node module utility
		, fsConfig = require('./../lib/fsConfig.js');
	
	//1. create custom logging function
	var CustomLogger = win.transports.Mssqllogger = function (options) {
		
		this.name = 'mssqllogger';
		this.level = options.level || 'info';
		
		//console.log(this.level);
		//console.log(options);
		//console.log("mssqllogger");
	};
	//2. pass it into winston
	util.inherits(CustomLogger, win.Transport);
	//3. grab the sql connection information
	var config = fsConfig.loadConfigFile('./configFiles/mssql.json'); //load config
	//4. implement the custom logger
	CustomLogger.prototype.log = function (level, msg, meta, callback) {
		
		//console.log(level);
		//console.log(msg);
		//console.log(meta);
		
		//make sure all the require fields will have a value
		var userid = meta.userid || "undefined"
			, ipaddress = meta.ipaddress || "undefined"
			, activity = meta.activity || "undefined";
		
		//open connection
		sql.connect(config, function(err) {
			if(err) { win.error(err); }
			
			//how to call a store procedure
			var request = new sql.Request();
			request.input('USERID', sql.NVARCHAR, userid);
			request.input('IPADDRESS', sql.NVARCHAR, ipaddress);
			request.input('ACTIVTY', sql.NVARCHAR, activity);
			request.input('LOGCODE', sql.NVARCHAR, level);
			request.input('MESSAGETXT', sql.NVARCHAR, msg);

			//use connection to execute store procedure SP_LOG
			request.execute('SP_LOG', function(err, recordsets, returnValue) {
				if(err) { win.error(err); }
				
				//console.log("SP_LOG");
				//console.dir(recordsets);
				//console.dir(returnValue);
			});
		});
		
		callback(null, true);
	};
	//5. add the logger winston instance
	win.add(win.transports.Mssqllogger, {
		desc: "MS SQL logging"
	});
	*/
	
})();