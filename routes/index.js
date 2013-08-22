
/*
 * GET home page.
 */
var db = require('./db');

// Get all DB entries and render the index.jade file
exports.list = function(req, res){
	db.query(req,res, {page: 'index'});
};