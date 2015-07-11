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


var gameHtml = fs.readFileSync("gsacGame.html");
function runGame(response, postData) {

    console.log("Request handler 'runGame' was called.");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(gameHtml);
    response.end();

    /*
	fs.readFile("gsacGame.html", function(err, info)
	{
		if (err)
		{
			console.error(err);
			response.statusCode = 500;
			response.end("Error @ server!");
			return;
		}
		else
		{
			response.writeHead(200, { "Content-Type": "text/html" });
			response.write(info);
			response.end();
		}
    });
    /**/
}

function testSQL(response, postData){
	console.log("Request handler 'testSQL' was called");
	
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : '173.194.86.81',
		user     : 'root',
		password : 'siskipiski',
		database : 'gsac'
	});

	connection.connect();

	connection.query('SELECT * FROM users', function(err, rows, fields) {
		if (!err)
		{
			console.log('Table data: ', rows);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write('<html><body><table>');
			for (var i = 0; i<rows.length; i++)
			{
				response.write('<tr><td>'+rows[i]['userID']+' : '+rows[i]['total']+' : '+rows[i]['score']+'</td></tr>');
			}
			response.write('</table></body></html>');
			response.end();
		}
		else
		    console.log('Error while performing Query.');
	});

	connection.end();
}

function updateUser(response, postData)
{
	console.log("updateUser called!");
	var viewer_id = querystring.parse(postData).viewer_id;
	var res = querystring.parse(postData).res;
	if (res)
		alert("Поздравляем," + viewer_id + " вы выиграли!")
	else
		alert("К сожалению," + viewer_id + " вы проиграли!")
	var sqlHelper = require('./SQLHelper.js');
	sqlHelper.updateUserInfo(viewer_id, res);
}

//exports.start = start;
//exports.upload = upload;
exports.runGame = runGame;
exports.updateUser = updateUser;
//exports.testSQL = testSQL;
