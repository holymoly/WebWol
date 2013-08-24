
/*
 * routes for config page
 */
var db = require('./db');


// Get all DB entries and render the config.jade file
exports.list = function(req,res){
	db.query(req,res, {page: 'config'});
};

// add one entrie from the database and render config.jade again
exports.add = function(req, res){
	db.create(req,res, {page: 'config'});
};

// remove one entrie from the database and render config.jade again
exports.remove = function(req, res){
	db.remove(req,res, {page: 'config'});
};
