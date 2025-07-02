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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jwt_service_1 = require("../jwt/jwt.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("../entities/roles.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository, jwtService, roleRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.roleRepository = roleRepository;
        this.repository = user_entity_1.UserEntity;
    }
    async findAll() {
        return await this.userRepository.find({});
    }
    async refreshToken(refreshToken) {
        return this.jwtService.refreshToken(refreshToken);
    }
    canDo(user, permission) {
        const permissions = user.permissionCodes;
        if (!permissions || permissions.length === 0) {
            throw new common_1.UnauthorizedException();
        }
        const result = permissions.includes(permission);
        if (!result) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async register(body) {
        try {
            const user = new user_entity_1.UserEntity();
            Object.assign(user, body);
            user.password = (0, bcrypt_1.hashSync)(user.password, 10);
            await this.userRepository.save(user);
            return { status: 'created' };
        }
        catch (error) {
            throw new common_1.HttpException('Error de creacion', 500);
        }
    }
    async login(body) {
        const user = await this.findByEmail(body.email);
        if (user == null) {
            throw new common_1.UnauthorizedException();
        }
        const compareResult = (0, bcrypt_1.compareSync)(body.password, user.password);
        if (!compareResult) {
            throw new common_1.UnauthorizedException();
        }
        return {
            accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
            refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh')
        };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles']
        });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }
    async findByEmail(email) {
        return await this.userRepository.findOneBy({ email });
    }
    async assignRole(id, roleIds) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        const roles = await this.roleRepository.findBy({ id: (0, typeorm_2.In)(roleIds) });
        user.roles = [...user.roles, ...roles];
        await this.userRepository.save(user);
        return 'Rol asignado con éxito';
    }
    async updateProfile(userId, updateData) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        Object.assign(user, updateData);
        const updatedUser = await this.userRepository.save(user);
        delete updatedUser.password;
        return updatedUser;
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        delete user.password;
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_service_1.JwtService,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map