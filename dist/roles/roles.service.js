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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_entity_1 = require("../entities/roles.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permissions_entity_1 = require("../entities/permissions.entity");
const user_entity_1 = require("../entities/user.entity");
const mensajeInterface_1 = require("../interfaces/mensajeInterface");
let RolesService = class RolesService {
    constructor(roleRepository, permissionRepository, userRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const permissions = dto.permissionIds
            ? await this.permissionRepository.findBy({ id: (0, typeorm_2.In)(dto.permissionIds) })
            : [];
        const users = dto.userIds
            ? await this.userRepository.findBy({ id: (0, typeorm_2.In)(dto.userIds) })
            : [];
        const role = this.roleRepository.create({
            name: dto.name,
            permissions,
            users,
        });
        return await this.roleRepository.save(role);
    }
    async findALL() {
        return await this.roleRepository.find({});
    }
    async findOne(id) {
        const role = await this.roleRepository.findOneBy({ id: Number(id) });
        if (!role) {
            throw new Error(`Role with id ${id} not found`);
        }
        return role;
    }
    async addPermissions(roleId, permissionIds) {
        const role = await this.roleRepository.findOneBy({ id: roleId });
        if (!role)
            throw new common_1.NotFoundException(`Role con id ${roleId} no existe.`);
        const permissions = await this.permissionRepository.findBy({ id: (0, typeorm_2.In)(permissionIds) });
        role.permissions = [...role.permissions, ...permissions];
        return await this.roleRepository.save(role);
    }
    async remove(id) {
        const result = await this.roleRepository.delete(id);
        if (result.affected === 0)
            throw new Error(`Rol con id ${id} no se encontró.`);
        const mensaje = new mensajeInterface_1.Mensaje('Deleted');
        return mensaje;
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.RoleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(permissions_entity_1.PermissionEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map