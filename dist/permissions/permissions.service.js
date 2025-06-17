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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permissions_entity_1 = require("../entities/permissions.entity");
const roles_entity_1 = require("../entities/roles.entity");
const typeorm_2 = require("typeorm");
const mensajeInterface_1 = require("../interfaces/mensajeInterface");
let PermissionsService = class PermissionsService {
    constructor(permissionRepository, roleRepository) {
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
    }
    async create(dto) {
        const roles = dto.roleIds
            ? await this.roleRepository.findBy({ id: (0, typeorm_2.In)(dto.roleIds) })
            : [];
        const permission = this.permissionRepository.create({
            name: dto.name,
            roles: roles
        });
        return this.permissionRepository.save(permission);
    }
    async findAll() { return await this.permissionRepository.find({}); }
    ;
    async findOne(id) {
        const permission = await this.permissionRepository.findOneBy({ id });
        if (!permission)
            throw new common_1.NotFoundException(`Permiso con id ${id} no encontrado`);
        return permission;
    }
    async remove(id) {
        const result = await this.permissionRepository.delete({ id });
        if (result.affected === 0)
            throw new Error(`Permiso con id ${id} no encontrado.`);
        const mensaje = new mensajeInterface_1.Mensaje('Deleted');
        return mensaje;
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permissions_entity_1.PermissionEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map