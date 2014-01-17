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

function soloNumeros(evt) {
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
    var key = evt.keyCode ? evt.keyCode : evt.which;
    return (key <= 40 || (key >= 48 && key <= 57));
}