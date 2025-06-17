import { RoleEntity } from '../entities/roles.entity';
import { Repository } from 'typeorm';
import { createRoleDto } from 'src/interfaces/createRoleDto';
import { PermissionEntity } from '../entities/permissions.entity';
import { UserEntity } from '../entities/user.entity';
import { Mensaje } from '../interfaces/mensajeInterface';
export declare class RolesService {
    private readonly roleRepository;
    private readonly permissionRepository;
    private readonly userRepository;
    constructor(roleRepository: Repository<RoleEntity>, permissionRepository: Repository<PermissionEntity>, userRepository: Repository<UserEntity>);
    create(dto: createRoleDto): Promise<RoleEntity>;
    findALL(): Promise<RoleEntity[]>;
    findOne(id: string): Promise<RoleEntity>;
    addPermissions(roleId: number, permissionIds: number[]): Promise<RoleEntity>;
    remove(id: number): Promise<Mensaje>;
}
