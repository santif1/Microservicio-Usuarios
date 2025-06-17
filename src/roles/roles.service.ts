import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEntity } from '../entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { createRoleDto } from 'src/interfaces/createRoleDto';
import { PermissionEntity } from '../entities/permissions.entity';
import { UserEntity } from '../entities/user.entity';
import { Mensaje } from '../interfaces/mensajeInterface';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    //Crea un nuevo rol de acuerdo al DTO
    async create( dto: createRoleDto ): Promise<RoleEntity> {
        const permissions = dto.permissionIds
            ? await this.permissionRepository.findBy({id: In(dto.permissionIds)})
            : []; // Busca los permisos asociados a los Ids del rol. Si no hay, asigna un array vacío.

        const users = dto.userIds
            ? await this.userRepository.findBy({ id: In(dto.userIds) })
            : []; // Busca los usuarios asociados a los Ids del rol. Si no hay, asigna un array vacío.

        const role = this.roleRepository.create({
            name: dto.name,
            permissions,
            users,
        });
        
        return await this.roleRepository.save(role);
    }

    //Obtiene todos los roles
    async findAll(): Promise<RoleEntity[]> {
        return await this.roleRepository.find({});
    }

    //Obtiene un rol por su Id
    async findOne(id: string): Promise<RoleEntity> {
        const role = await this.roleRepository.findOneBy({ id: Number(id) });
        if (!role) {
            throw new Error(`Role with id ${id} not found`);
        }
        return role;
    }

    
    async addPermissions(roleId: number, permissionIds: number[]): Promise<RoleEntity> {

        const role = await this.roleRepository.findOneBy({ id: roleId });

        if(!role) throw new NotFoundException (`Role con id ${roleId} no existe.`);

        const permissions = await this.permissionRepository.findBy({ id: In(permissionIds) });

        role.permissions = [...role.permissions, ...permissions];

        return await this.roleRepository.save(role);

    }

    async remove(id: number): Promise<Mensaje> {
        const result = await this.roleRepository.delete(id)
        if (result.affected === 0) throw new Error (`Rol con id ${id} no se encontró.`);
        
        const mensaje = new Mensaje('Deleted');

        return mensaje;
        
    }
}
