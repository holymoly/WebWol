var pg = require('pg')
  , wol = require('wake_on_lan')	
  ,	db = require('./db')
  , config = require('../config.json');

// Get all DB entries and render the index.jade file
exports.list = function(req, res){
	client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database );
	client.connect();
	var query = client.query('SELECT * FROM ' + config.Table)
		, pclist = new Array();

	query.on('row', function(row){
		//pclist.push(row);
		pclist.push({Name: row.name.replace(/\s+/g, ' '), IP: row.ip.replace(/\s+/g, ' '), Mac: row.mac.replace(/\s+/g, ' ')});
		//console.log(row);
	});

	query.on('end', function() { 
		client.end();
	  	res.render('index',{title: 'Wol', pclist: pclist});
	});
};

// Get all DB entries and render the config.jade file
exports.config = function(req,res){
	client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database);
	client.connect();
	var query = client.query('SELECT * FROM ' + config.Table)
		, pclist = new Array();

	query.on('row', function(row){
		//pclist.push(row);
		pclist.push({Name: row.name.replace(/\s+/g, ' '), IP: row.ip.replace(/\s+/g, ' '), Mac: row.mac.replace(/\s+/g, ' ')});
		//console.log(row);
	});

	query.on('end', function() { 
	  	client.end();
	  	res.render('config',{title: 'Wol', pclist: pclist});
	});
};

// add one entrie from the database and render config.jade again
exports.create = function(req, res){
	console.log(req.body);
	client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database);
	client.connect();
	
	var query = client.query('INSERT INTO ' + config.Table + ' (name,ip,mac) VALUES ($1, $2, $3)'
		, [req.body.PcName, req.body.Ip,req.body.Mac]);

	query.on('end', function() { 
	  	client.end();
	  	db.config(req,res);
	});
};

// remove one entrie from the database and render config.jade again
exports.remove = function(req, res){
	console.log(req.body);
	client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database);
	client.connect();
	
	var query = client.query('DELETE FROM ' + config.Table + ' WHERE name=$1 AND ip=$2 AND mac=$3'
		, [req.body.PcName, req.body.Ip,req.body.Mac]);

	query.on('end', function() { 
	  	client.end();
	  	db.config(req,res);
	});
};

// Send WOL signal from index.jade
exports.wol = function(req, res){
	console.log(req.body);
	//wol.wake(req.body.Mac);

	wol.wake(req.body.Mac.replace(/\s+/g, ''), function(error) {
  		if (error) {
    		console.log('Error during WOL with Mac: ' + req.body.Mac);
  		} else {
    		console.log('WOL with Mac:' + req.body.Mac);
  		}
  		db.list(req,res);
	});
};