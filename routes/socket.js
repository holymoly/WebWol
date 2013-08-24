
/*
 * Handling socket events
 */
var wol = require('./wol')

// Triggers the WOL signal
exports.wol = function(socket){
  socket.on('wol', function(mac) {
    wol.wol(mac);
  });
};

//starts ping scan
exports.scan = function(socket){
    wol.scan(socket);
};

// Emits results of ping scan to clients
exports.updateResults = function(target,data,socket){
  console.log(data);
  socket.emit('updateResult', { client: target, data: data });
};

//starts ping scan again
exports.updateScan = function(socket){
  socket.on('updateScan', function() {
    wol.scan(socket);
  });
};
