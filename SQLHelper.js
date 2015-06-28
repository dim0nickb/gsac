var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : '173.194.86.81',
	user     : 'root',
	password : 'siskipiski',
	database : 'gsac'
});

function exec(query) {
	connection.connect();
	connection.query(query, function (err, rows, fields) {
		if (!err) {
			return rows;
		}
		else
			console.log('Error while performing Query.');
	});
	connection.end();
}
function isNumber(obj) { return !isNaN(parseFloat(obj)) }

function addUser(userID) {
	if (!isNumber(userID))
		return false;

	var q = 'SELECT * FROM users WHERE userID = ' + userID;
	if (exec(q).length === 0) {
		q = 'INSERT INTO users (userID, total, score) VALUES (' + userID + '0, 0';
		exec(q);
	}
	return true;
}