var express = require('express');
var app = express();

var messages = [];
var responses = [];

app.get('/', function (req, res){
	debugger;
	res.send('hello world');
});

app.get('/messages', function (req, res){
	responses.push(res);	
	//res.send(messages + '<script>setTimeout(function(){window.location.reload()},1000) </script>');
});

app.get('/messages/:message', function (req, res){
	messages.push(req.params.message);

	responses.forEach(function(res){
		res.send(messages + '<script>window.location.reload();</script>');
	})
	res.send('tu mensaje recibido fue: ' + req.params.message)
});

app.listen(3000);
console.log('listening on port 3000');