(function () {

	var socket;

	$(document).ready(function() {
		socket = io.connect();
		socket.on('connect', function () {
			$('#sub').click(function () {
				subscribe('test');
			});

			$('#pub').click(function () {
				publish('test', 'foo')
			});

			receive(function (message) {
				// console.log(message);
				$('#res').append('<li>' + message + '</li>');
			});
		});
	});

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
}());
