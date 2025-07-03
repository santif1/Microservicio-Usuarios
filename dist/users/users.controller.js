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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const login_dto_1 = require("../interfaces/login.dto");
const register_dto_1 = require("../interfaces/register.dto");
const jwt_service_1 = require("../jwt/jwt.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const common_2 = require("@nestjs/common");
const updateuser_dto_1 = require("../dto/updateuser.dto");
let UsersController = class UsersController {
    constructor(service, jwtService, usersService) {
        this.service = service;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async findAll() {
        return this.service.findAll();
    }
    login(body) {
        return this.service.login(body);
    }
    register(body) {
        return this.service.register(body);
    }
    canDo(request, permission) {
        return this.service.canDo(request.user, permission);
    }
    refreshToken(request) {
        const token = request.headers['refresh-token'];
        if (!token || typeof token !== 'string') {
            throw new common_1.UnauthorizedException('No refresh token provided');
        }
        return this.jwtService.refreshToken(token);
    }
    assignRole(id, dto) {
        return this.service.assignRole(id, dto.roleIds);
    }
    canDoMultiple(request, body) {
        const allowed = body.permissions.every(p => this.service.canDo(request.user, p));
        return { allowed };
    }
    async getProfile(request) {
        console.log('🔍 request.user completo:', request.user);
        console.log('🔍 request.user.id:', request.user?.id);
        if (!request.user || !request.user.id) {
            throw new Error('Usuario no autenticado o ID faltante');
        }
        const userId = request.user.id;
        return this.service.getProfile(userId);
    }
    async updateProfile(request, updateProfileDto) {
        console.log('🔍 Datos a actualizar:', updateProfileDto);
        console.log('🔍 request.user:', request.user);
        if (!request.user || !request.user.id) {
            throw new Error('Usuario no autenticado o ID faltante');
        }
        const userId = request.user.id;
        try {
            const updatedUser = await this.service.updateProfile(userId, updateProfileDto);
            console.log('✅ Usuario actualizado:', { id: updatedUser.id, email: updatedUser.email });
            if (updateProfileDto.email && updateProfileDto.email !== request.user.email) {
                const newToken = this.jwtService.generateToken({ email: updatedUser.email });
                console.log('🔄 Email cambiado, generando nuevo token');
                return {
                    user: updatedUser,
                    access_token: newToken,
                    message: 'Perfil actualizado. Token renovado debido al cambio de email.'
                };
            }
            return updatedUser;
        }
        catch (error) {
            console.error('❌ Error actualizando perfil:', error);
            throw new Error('Error al actualizar perfil');
        }
    }
    async checkEmailExists(email, excludeUserId) {
        const excludeId = excludeUserId ? parseInt(excludeUserId) : undefined;
        return this.service.checkEmailExists(email, excludeId);
    }
    async findOne(email) {
        return this.service.findByEmail(email);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('users/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('users/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, common_1.Get)('can-do/:permission'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('permission')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "canDo", null);
__decorate([
    (0, common_1.Post)('users/refresh-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('users/:id/roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "assignRole", null);
__decorate([
    (0, common_1.Post)('can-do'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "canDoMultiple", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, common_1.Get)('users/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, common_2.Put)('users/profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateuser_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, common_1.Get)('check-email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Query)('excludeUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkEmailExists", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, common_1.Get)('users/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_service_1.JwtService, users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map