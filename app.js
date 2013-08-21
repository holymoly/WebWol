
/**
 * Module dependencies.
 */

//Modul for Webserver
var express = require('express')
  , pg = require('pg')	
  , routes = require('./routes')
  , user = require('./routes/user')
  , db = require('./routes/db')
  , http = require('http')
  , path = require('path')
  , config =require('./config.json');

var app = express();

// create Database if not exists
client = new pg.Client('postgres://' + config.User + ':' + config.Pass + '@' + config.DbIP + '/' + config.Database);
client.connect();
var query = client.query("CREATE TABLE IF NOT EXISTS " + config.Table + "(name char(20), ip char(15), mac char(17))");

query.on('end', function() { 
		client.end();
});


// all environments
app.set('port', process.env.PORT || config.Port);
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
app.get('/', db.list);
app.get('/config', db.config);

app.post('/remove', db.remove);
app.post('/add', db.create);
app.post('/', db.wol);

// start Server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});