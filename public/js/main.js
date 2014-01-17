$(document).ready(function(){
	window.io = io.connect();

	io.on('connect', function(socket){
		console.log('hi');
		io.emit('hello?');
	})

	io.on('saludo', function (data){
		console.log(data);
	})

	io.on('log-in', function (data){
		debugger;
	});

	io.on('log-out', function (data){
		debugger;
	});

});

