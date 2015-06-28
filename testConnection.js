var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '173.194.86.81',
  user     : 'root',
  password : 'siskipiski',
  database : 'gsac'
});

connection.connect();

connection.query('SELECT * from users', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();