
/**
 * Module dependencies.
 */

//Modules
var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , db = require('./routes/db')
  , index = require('./routes/index')
  , config = require('./routes/config')
  , user = require('./routes/user')
  , socketEventsListers = require('./routes/socket')
  , configFile =require('./config.json');

// create database if not already exists
db.createDb();

var app = express();

// all environments
app.set('port', process.env.PORT || configFile.Port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/wecker.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// set routes
app.get('/', index.list);
app.get('/config', config.list);
app.post('/remove', config.remove);
app.post('/add', config.add);

// start Server
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
//io.set('log level', 1); // reduce logging

// Creating listeners and events on client socket connection
io.sockets.on('connection', function (socket) {
  // Add listener for wol event
  socketEventsListers.wol(socket); 
  socketEventsListers.scan(socket);
  socketEventsListers.updateScan(socket);
  socketEventsListers.searchPc(socket,'192.168.123');
  /*
  arp.getMac('192.168.123.1', function(err, mac){
    if (err){
      console.log(err);
    }
    else{
      console.log(mac);
    }
  });
  */
});
