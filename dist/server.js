"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = process.env.PORT || 3001;
app_1.default.set('port', port);
app_1.default.listen(port, function () {
    console.log("App is listening on port " + port);
});
//# sourceMappingURL=server.js.map