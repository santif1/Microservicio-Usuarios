"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewaresModule = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("./auth.middleware");
const jwt_module_1 = require("../jwt/jwt.module");
const users_module_1 = require("../users/users.module");
const core_1 = require("@nestjs/core");
let MiddlewaresModule = class MiddlewaresModule {
};
exports.MiddlewaresModule = MiddlewaresModule;
exports.MiddlewaresModule = MiddlewaresModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, jwt_module_1.JwtModule, core_1.Reflector],
        providers: [auth_middleware_1.AuthGuard],
        exports: [auth_middleware_1.AuthGuard],
    })
], MiddlewaresModule);
//# sourceMappingURL=middleware.module.js.map