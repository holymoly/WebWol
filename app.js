
/**
 * Module dependencies.
 */

//Modules
var express = require('express')
  , http = require('http')
  , pg = require('pg')  
  , path = require('path')
  , routes = require('./routes')
  , db = require('./routes/db')
  , index = require('./routes/index')
  , config = require('./routes/config')
  , user = require('./routes/user')
  , wol = require('./routes/wol')
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

io.sockets.on('connection', function (socket) {
  /*
  socket.emit('news', { hello: 'world' });
  
  socket.on('my other event', function (data) {
    console.log(data);
  });
  */

  socket.on('print', function(data) {
   wol.wol(data);
  });
})


