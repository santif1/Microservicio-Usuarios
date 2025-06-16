import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permissions.entity';
import { RoleEntity } from 'src/entities/roles.entity';
import { createPermissionDto } from 'src/interfaces/createPermissionDto';
import { Repository, In } from 'typeorm';
import { Mensaje } from '../interfaces/mensajeInterface';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ){}

    async create(dto: createPermissionDto): Promise<PermissionEntity>{

        const roles = dto.roleIds
            ? await this.roleRepository.findBy({ id: In(dto.roleIds) })
            : [];

        const permission = this.permissionRepository.create({
            name: dto.name,
            roles: roles
        })
        
        return this.permissionRepository.save(permission);
    }

    async findAll():Promise<PermissionEntity[]> { return await this.permissionRepository.find({})};

    async findOne(id:number): Promise<PermissionEntity>{
        const permission = await this.permissionRepository.findOneBy({id})

        if(!permission) throw new NotFoundException(`Permiso con id ${id} no encontrado`)

        return permission; 
    }

    async remove(id:number): Promise<Mensaje>{

        const result = await this.permissionRepository.delete({id})

        if(result.affected === 0) throw new Error (`Permiso con id ${id} no encontrado.`)

        const mensaje = new Mensaje('Deleted')
        return mensaje;
    }
    
}
