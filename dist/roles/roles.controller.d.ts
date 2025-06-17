import { RolesService } from './roles.service';
import { createRoleDto } from 'src/interfaces/createRoleDto';
export declare class RolesController {
    private readonly RolesService;
    constructor(RolesService: RolesService);
    createRole(dto: createRoleDto): Promise<import("../entities/roles.entity").RoleEntity>;
    findAll(): Promise<import("../entities/roles.entity").RoleEntity[]>;
    findOne(id: string): Promise<import("../entities/roles.entity").RoleEntity>;
    addPermissions(id: number, dto: {
        permissionIds: number[];
    }): Promise<import("../entities/roles.entity").RoleEntity>;
    remove(id: number): Promise<import("../interfaces/mensajeInterface").Mensaje>;
}
