var http = require("http");
var url = require("url");
var sqlHelper = require('./SQLHelper.js');

function start(route, handle) {
    function onRequest(request, response) {
		//������� ���������������� ������������.
		var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        console.log(request.url);
		// �������� viewer_id �� ���������� ����������
		var viewer_id = query['viewer_id'];
		// ��������� ������ ��������� �������
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log(pathname);
		request.setEncoding("utf8");
		request.addListener("end", function () {
			route(handle, pathname, response, postData);
		});
		
		/*
		sqlHelper.addUser(viewer_id, function (res) {
			if (!res) {
				response.statusCode = 500;
				var s = '<html>' +
				'<head>' +
				'<meta http-equiv="Content-Type" content="text/html; ' +
				'charset=UTF-8" />' +
				'</head>' +
				'<body>' +
				'<div id = "badUser">Bad user !<BR>Please contact to <a href = "http://vk.com/drgonza">developer</a></div>' +
				'</body>' +
				'</html>';
				response.writeHead(200, { "Content-Type": "text/html" });
				response.write(s);
				response.end();
				return;
			}
			else
			{
				var postData = "";
				var pathname = url.parse(request.url).pathname;
                console.log(pathname);

				request.setEncoding("utf8");
				request.addListener("end", function () {
					route(handle, pathname, response, postData);
				});
			}
		});
		/**/
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started @8888");
}

exports.start = start;