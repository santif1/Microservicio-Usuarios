"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const users_controller_1 = require("./users/users.controller");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const users_module_1 = require("./users/users.module");
const middleware_module_1 = require("./middlewares/middleware.module");
const jwt_module_1 = require("./jwt/jwt.module");
const seed_service_1 = require("./users/seed.service");
const jwt_service_1 = require("./jwt/jwt.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: '127.0.0.1',
                port: 5434,
                database: 'users',
                username: 'postgres',
                password: 'postgres1',
                synchronize: false,
                dropSchema: false,
                entities: entities_1.entities,
            }),
            typeorm_1.TypeOrmModule.forFeature(entities_1.entities),
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            users_module_1.UsersModule,
            middleware_module_1.MiddlewaresModule,
            jwt_module_1.JwtModule,
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController],
        providers: [
            seed_service_1.SeedService, jwt_service_1.JwtService
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map