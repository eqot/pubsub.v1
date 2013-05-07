'use strict';

var http = require('http');
var fs = require('fs');

var clientHtml = {
	content: fs.readFileSync('app/index.html'),
	type: 'text/html'
};
var clientJS = {
	content: fs.readFileSync('app/main.js'),
	type: 'application/javascript'
};

var server = http.createServer(function (req, res) {
	// console.log(req.url);
	var file = req.url === '/' ? clientHtml : clientJS;
    res.writeHead(200, {'Content-Type': file.type});
    res.end(file.content);
}).listen(8080);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	// console.log('connected');

	socket.on('sub', function (group) {
		// console.log(group);
		socket.join(group);
	});

	socket.on('pub', function (message) {
		// console.log(message);
		io.sockets.to(message.group).emit('res', message.content);
	});
});
