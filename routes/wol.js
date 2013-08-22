
/*
 * Handling wol stuffs
 */

var wol = require('wake_on_lan')
  , db = require('./db');


// Send WOL signal from index.jade
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