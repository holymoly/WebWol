
/*
 * Handling wol stuffs
 */

var wol = require('wake_on_lan')
  , ping = require ('net-ping')
  , db = require('./db')
  , socketEventsListeners = require('./socket');

// Creates the listener for the WOL event
exports.wol = function(mac){
  //console.log(req.body);
  wol.wake(mac.mac.replace(/\s+/g, ''), function(error) {
      if (error) {
        console.log('Error during WOL with Mac: ' + mac.mac);
      } else {
        console.log('WOL with Mac: ' + mac.mac);
      }
  });
};

exports.scan = function(socket){
  //Ping hosts
  db.query(function(pclist){
    //console.log(pclist);
    var session = ping.createSession ();
    
    pclist.forEach(function(value) {
      var target = value.IP.replace(/\s+/g, '');
      session.pingHost (target, function (error, target) {
        if (error)
          socketEventsListeners.updateResults(target,'failed',socket);
          //console.log (target + ": " + error.toString ());
        else
          //socket.emit('updateScan', { hello: target })
          socketEventsListeners.updateResults(target, 'active',socket);
        });
      });


  });
};
