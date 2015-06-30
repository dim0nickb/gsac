var mysql = require('mysql');
var pool = mysql.createPool({
	host     : '173.194.86.81',
	user     : 'root',
	password : 'siskipiski',
	database : 'gsac'
});

function exec(q, callback){
	pool.getConnection(function (err, connection, callback) {
			connection.query(q, function onExec(err, rows, callbaCK) {
				if (!err) {
					console.log('callback called with result: ' + rows);
					callback(rows);
				}
				else {
					console.log('Error while performing Query.');
				}
			});
			connection.release();
		});
}

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