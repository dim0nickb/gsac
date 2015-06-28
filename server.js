var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		
		//пробуем зарегистрировать пользователя.
		var url_parts = url.parse(request.url, true);
		var query = url_parts.query;
		// получаем viewer_id из полученных переменных
		var viewer_id = query['viewer_id'];
		// выполняем запрос получения профиля
		var sqlHelper = require('./SQLHelper.js');
		if (!sqlHelper.addUser(viewer_id)) {
			response.statusCode = 500;
			response.end("Bad user! Please contact to <a href = 'http://vk.com/drgonza'>developer</a>");
		}

		var postData = "";
		var pathname = url.parse(request.url).pathname;

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});

	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started @8888");
}

exports.start = start;