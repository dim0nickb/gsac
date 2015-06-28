var querystring = require("querystring");
var server = require("./server");
var game = require("./game");
var fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

function runGame(response, postData) {
	console.log("Request handler 'runGame' was called.");
	fs.readFile("gsacGame.html", function(err, info)
	{
		if (err)
		{
			console.error(err);
			response.statusCode = 500;
			response.end("Error @ server!");
			return;
		}
		response.end(info);
	});
}

function testSQL(response, postData){
	console.log("Request handler 'testSQL' was called");
	fs.readFile("testConnection.js", function(err, info)
	{
		if (err)
		{
			console.error(err);
			response.statusCode = 500;
			response.end("Error @ server!");
			return;
		}
		response.end(info);
	});
}

exports.start = start;
exports.upload = upload;
exports.runGame = runGame;
exports.testSQL = testSQL;