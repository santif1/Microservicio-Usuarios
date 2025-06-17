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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const createPermissionDto_1 = require("../interfaces/createPermissionDto");
const permissions_decorator_1 = require("../middlewares/decorators/permissions.decorator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permissions_service_1 = require("./permissions.service");
let PermissionsController = class PermissionsController {
    constructor(PermissionsService) {
        this.PermissionsService = PermissionsService;
    }
    create(dto) {
        return this.PermissionsService.create(dto);
    }
    findAll() {
        return this.PermissionsService.findAll();
    }
    findOne(id) {
        return this.PermissionsService.findOne(id);
    }
    remove(id) {
        return this.PermissionsService.remove(id);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)(['permissions_create']),
    (0, common_1.Post)('permissions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPermissionDto_1.createPermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('permissions/:id'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)(['delete_permissions']),
    (0, common_1.Delete)('permissions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "remove", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map