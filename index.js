var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.runGame;
handle["/updateUserInfo"] = requestHandlers.updateUserInfo;
//handle["/testSQL"] = requestHandlers.testSQL;

server.start(router.route, handle);