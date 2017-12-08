"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var index_1 = require("./controllers/index");
require("reflect-metadata");
routing_controllers_1.useContainer(typedi_1.Container);
var app = routing_controllers_1.createExpressServer({
    controllers: [
        index_1.IntroController,
        index_1.UserController
    ]
});
var port = process.env.PORT || 1111;
app.listen(port, function () {
    console.log("The server is starting at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map