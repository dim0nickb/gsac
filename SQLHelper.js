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

function exec(q, callback){
	var res = [];
	pool.getConnection(function (err, connection, callback) {
			connection.query(q, onExec);
			connection.release();
		});
}

function onExec(err, rows) {
	if (!err) {
		console.log(rows);
		callback(rows);
	}
	else {
		console.log('Error while performing Query.');
	}
};

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

function addUser(userID,  callback) {
	if (!isNumber(userID))
		return false;

	var q = 'SELECT * FROM users WHERE userID = ' + userID + ';';
	console.log(q);
	exec(q, insertNewUser);

	function insertNewUser(res) {
		console.log(res);
		if (res.length === 0) {
			q = 'INSERT INTO users (userID, total, score) VALUES (' + userID + ', 0, 0);';
			console.log(q);
			exec(q, done);
		}
		else
			callback(false);
	}

	function done(res) {
		callback(true);
	}
}

exports.addUser = addUser;
exports.exec = exec;