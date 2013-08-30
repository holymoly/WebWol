/*
 * getting macs
 */

var spawn = require('child_process').spawn
  , ping = require ('net-ping')
  , arp = require('./arp');

//check entries of /proc/net/cat
exports.getMac = function(range, callback) {
  var session = ping.createSession();
  for(var i = 1; i <= 254; i++) {
    session.pingHost (range + '.' + i, function (err,target) {
      //console.log(target);
      if (err){
        //console.log(target + ' failed');
      }
      else{
        console.log(target + ' active');
      }  
      // Get arp if the last one was pinged
    });
    //console.log(i);
    if (i == 254){
      arp.getArp(i,callback);
    }
  }
};

exports.getArp = function(i,callback){
  //console.log('Arp: ' + i);
  setTimeout((function() {
    var arp = spawn("cat", ["/proc/net/arp"] );
    var buffer = '';
    var errstream = '';
    
    arp.stdout.on('data', function (data) {
      buffer += data;
    });
    
    arp.stderr.on('data', function (data) {
      error += data;
    });
    
    arp.on('close', function (data) {
      if (data != 0) {
        console.log("Error running arp " + data + " " + errstream);
        callback(true, code);
      }
      var table = buffer.split('\n');
      //console.log(table);
      var result = new Array();
      for ( var l = 1; l < table.length - 1; l++) {
        //if (table[l].indexOf(target) == 0) {
        if (table[l].substring(41, 58) != '00:00:00:00:00:00') {
          var mac = table[l].substring(41, 58);
          var ip = table[l].substring(0, 15);
        result.push({ip: ip, mac: mac});
        }
      }
      callback(false, result);
    });
  }), 5000);
};