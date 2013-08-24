
/*
 * Communication with postgres
 */

var pg = require('pg')
  , db = require('./db')
  , config = require('../config.json');

  
// get list of machines and render page  
exports.query = function(callback){
  client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database );
  client.connect();
  var query = client.query('SELECT * FROM ' + config.Table)
    , pclist = new Array();

  query.on('row', function(row){
    //pclist.push(row);
    pclist.push({Name: row.name.replace(/\s+/g, ''), IP: row.ip.replace(/\s+/g, ''), Mac: row.mac.replace(/\s+/g, '')});
    //console.log(row);
  });

  query.on('end', function() { 
    client.end();
    callback(pclist);
  });
};

// add one entrie from the database and render config.jade again
exports.add = function(req, res, callback){
  console.log(req.body);
  client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database);
  client.connect();
  
  var query = client.query('INSERT INTO ' + config.Table + ' (name,ip,mac) VALUES ($1, $2, $3)'
    , [req.body.PcName, req.body.Ip,req.body.Mac]);

  query.on('end', function() { 
      client.end();
      callback();
  });
};

// remove one entrie from the database and render config.jade again
exports.remove = function(req, res, callback){
  console.log(req.body);
  client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database);
  client.connect();
  
  var query = client.query('DELETE FROM ' + config.Table + ' WHERE name=$1 AND ip=$2 AND mac=$3'
    , [req.body.PcName, req.body.Ip,req.body.Mac]);

  query.on('end', function() { 
      client.end();
      callback();
  });
};

// create Database if not exists
exports.createDb = function(){
  client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database);
  client.connect();
  var query = client.query("CREATE TABLE IF NOT EXISTS " + config.Table + "(name char(20), ip char(15), mac char(17))");
  
  query.on('end', function() { 
      client.end();
  });
};
