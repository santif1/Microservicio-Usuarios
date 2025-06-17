import { PermissionEntity } from 'src/entities/permissions.entity';
import { RoleEntity } from 'src/entities/roles.entity';
import { createPermissionDto } from 'src/interfaces/createPermissionDto';
import { Repository } from 'typeorm';
import { Mensaje } from '../interfaces/mensajeInterface';
export declare class PermissionsService {
    private readonly permissionRepository;
    private readonly roleRepository;
    constructor(permissionRepository: Repository<PermissionEntity>, roleRepository: Repository<RoleEntity>);
    create(dto: createPermissionDto): Promise<PermissionEntity>;
    findAll(): Promise<PermissionEntity[]>;
    findOne(id: number): Promise<PermissionEntity>;
    remove(id: number): Promise<Mensaje>;
}
