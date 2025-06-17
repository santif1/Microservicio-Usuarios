"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const roles_controller_1 = require("./roles.controller");
const roles_service_1 = require("./roles.service");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const jwt_service_1 = require("../jwt/jwt.service");
const users_module_1 = require("../users/users.module");
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature(entities_1.entities),
            users_module_1.UsersModule
        ],
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService, jwt_service_1.JwtService],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map