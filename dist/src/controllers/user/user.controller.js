"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.execute = function () {
        return 'This is the user controller';
    };
    __decorate([
        routing_controllers_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], UserController.prototype, "execute", null);
    UserController = __decorate([
        typedi_1.Service(),
        routing_controllers_1.JsonController('/users'),
        __metadata("design:paramtypes", [])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map