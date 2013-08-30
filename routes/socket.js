
/*
 * Handling socket events
 */
var wol = require('./wol');
var arp = require('./arp')

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
  socket.emit('pingResult', { client: target, data: data });
};

//starts ping scan again
exports.updateScan = function(socket){
  socket.on('updateScan', function() {
    wol.scan(socket);
  });
};

//starts searching for mac adresses
exports.searchPc = function(socket,range){
  //socket.on('searchPc', function(){
    arp.getMac(range, function(err,data){
      if (err){
        console.log('Error: ' + err);
      }
      else{
        socket.emit('macResult',data);
      }
    });
};
