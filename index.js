var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.runGame;
handle["/js/src"] = requestHandlers.runGame;

server.start(router.route, handle);