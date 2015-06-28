//var mysql = require('mysql');
//var connection = mysql.createConnection({
//	host     : '173.194.86.81',
//	user     : 'root',
//	password : 'siskipiski',
//	database : 'gsac'
//});

var mysql = require('mysql');
var pool = mysql.createPool({
	host     : '173.194.86.81',
	user     : 'root',
	password : 'siskipiski',
	database : 'gsac'
});

function exec(query){
	var res = [];
	pool.getConnection(function (err, connection) {
		// Use the connection
		connection.query(query, function (err, rows) {
			if (!err) {
				console.log(rows);
				res = rows;
				return res;
			}
			else {
				console.log('Error while performing Query.');
				return res;
			}
			// And done with the connection.
			connection.release();
		// Don't use the connection here, it has been returned to the pool.
		});
	});
}
//function exec(query) {
//	var res = [];
//	connection.connect();
//	connection.query(query, function (err, rows, fields) {
//		if (!err) {
//			console.log(rows);
//			//res = rows;
//		}
//		else
//			console.log('Error while performing Query.');
//	});
//	connection.end();
//	return res;
//}
function isNumber(obj) { return !isNaN(parseFloat(obj)) }

function addUser(userID) {
	if (!isNumber(userID))
		return false;

	var q = 'SELECT * FROM users WHERE userID = ' + userID + ';';
	console.log(q);
	var res = exec(q);
	console.log(res);
	if (res.length === 0) {
		q = 'INSERT INTO users (userID, total, score) VALUES (' + userID + ', 0, 0);';
		console.log(q);
		exec(q);
	}
	return true;
}

exports.addUser = addUser;
exports.exec = exec;