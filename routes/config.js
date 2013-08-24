
/*
 * routes for config page
 */
var db = require('./db')
  , config = require('./config');


// Get all DB entries and render the config.jade file
exports.list = function(req, res){
  db.query(function(pclist){
    res.render('config',{title: 'Wol', pclist: pclist});
  });
};

// add one entrie from the database and render config.jade again
exports.add = function(req, res){
  db.add(req, res, function(){
    config.list(req,res);
  });
};

// remove one entrie from the database and render config.jade again
exports.remove = function(req, res){
  db.remove(req, res, function(){
    config.list(req,res);
  });
};
