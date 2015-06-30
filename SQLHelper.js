var mysql = require('mysql');
var pool = mysql.createPool({
	host     : '173.194.86.81',
	user     : 'root',
	password : 'siskipiski',
	database : 'gsac'
});

function exec(q, callback){
	var cb = callback;
	pool.getConnection(function (err, connection) {
			connection.query(q, function onExec(err, rows) {
				if (!err) {
					console.log('callback called with result: ');
					console.log(rows);
					cb(rows, true);
				}
				else {
					console.log('Error while performing Query.');
					cb(rows, false);
				}
			});
			connection.release();
		});
}

function isNumber(obj) { return !isNaN(parseFloat(obj)) }

function addUser(userID,  callback) {
	var cb = callback;
	if (!isNumber(userID))
		return false;

	var q = 'SELECT * FROM users WHERE userID = ' + userID + ';';
	console.log(q);
	exec(q, insertNewUser);

	function insertNewUser(rows, res) {
		if (!res)
			cb(false);
		console.log(rows);
		console.log(rows.length);
		if (rows.length === 0) {
			q = 'INSERT INTO users (userID, total, score) VALUES (' + userID + ', 0, 0);';
			console.log(q);
			exec(q, done);
		}
		else
			cb(true);
	}

	function done(rows, res) {
		cb(res);
	}

}



exports.addUser = addUser;
exports.exec = exec;