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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const roles_entity_1 = require("../entities/roles.entity");
const permissions_entity_1 = require("../entities/permissions.entity");
const bcrypt = require("bcrypt");
let SeedService = class SeedService {
    constructor(userRepo, roleRepo, permissionRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
    }
    async onModuleInit() {
        await this.seedAdminUser();
    }
    async seedAdminUser() {
        const allPermissions = [
            'create_users',
            'create_roles',
            'add_permissions',
            'create_payments',
            'payments_list',
            'modify_payments',
            'refund_payments',
            'remove_payments',
            'order_list',
            'order_create',
            'order_modify',
            'order_remove',
            'permissions_create'
        ];
        const createdPermissions = await Promise.all(allPermissions.map(async (name) => {
            let permission = await this.permissionRepo.findOneBy({ name });
            if (!permission) {
                permission = this.permissionRepo.create({ name });
                await this.permissionRepo.save(permission);
            }
            return permission;
        }));
        let adminRole = await this.roleRepo.findOne({
            where: { name: 'admin' },
            relations: ['permissions'],
        });
        if (!adminRole) {
            adminRole = this.roleRepo.create({
                name: 'admin',
                permissions: createdPermissions,
            });
            await this.roleRepo.save(adminRole);
        }
        let adminUser = await this.userRepo.findOneBy({ email: 'admin@example.com' });
        if (!adminUser) {
            adminUser = this.userRepo.create({
                email: 'admin@example.com',
                password: await bcrypt.hash('123456', 10),
                roles: [adminRole],
            });
            await this.userRepo.save(adminUser);
            console.log('✅ Usuario admin creado');
        }
        else {
            console.log('⚠️  Usuario admin ya existía');
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.RoleEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(permissions_entity_1.PermissionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map