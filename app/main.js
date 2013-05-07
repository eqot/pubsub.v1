
var socket;

function init() {
	socket = io.connect();
	socket.on('connect', function () {
		var sub = document.getElementById('sub');
		sub.addEventListener('click', function () {
			subscribe('test');
		});

		var pub = document.getElementById('pub');
		pub.addEventListener('click', function () {
			publish('test', 'foo')
		});

		var res = $('#res');
		receive(function (message) {
			// console.log(message);
			res.append('<li>' + message + '</li>');
		});
	});
};

function subscribe(group) {
	socket.emit('sub', group);
};

function publish(group, content) {
	socket.emit('pub', {
		group: group,
		content: content
	});
};

function receive(callback) {
	socket.on('res', callback);
};
