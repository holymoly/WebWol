
/*
 * GET home page.
 */
var db = require('./db');

// Get all DB entries and render the index.jade file
exports.list = function(req, res){
  db.query(function(pclist){
    res.render('index',{title: 'Wol', pclist: pclist});
  });
};