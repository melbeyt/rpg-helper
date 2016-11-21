var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Actor = require('./scripts/client/actor.js');
var People = {
	DM: '',
	actors: []
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	People.actors.push(new Actor('Player' + socket.id, '10', '0,0', 'P', socket.id));
	
	socket.on('disconnect', function() {
		console.log('user disconnected');
		for (var a in People.actors) {
			if (People.actors[a].id == socket.id) {
				People.actors.splice(a, 1);
			}
		}		
	});

	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


