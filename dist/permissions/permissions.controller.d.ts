import { createPermissionDto } from 'src/interfaces/createPermissionDto';
import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly PermissionsService;
    constructor(PermissionsService: PermissionsService);
    create(dto: createPermissionDto): Promise<import("../entities/permissions.entity").PermissionEntity>;
    findAll(): Promise<import("../entities/permissions.entity").PermissionEntity[]>;
    findOne(id: number): Promise<import("../entities/permissions.entity").PermissionEntity>;
    remove(id: number): Promise<import("../interfaces/mensajeInterface").Mensaje>;
}
