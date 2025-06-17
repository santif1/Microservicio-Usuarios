import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/roles.entity';
import { PermissionEntity } from '../entities/permissions.entity';
export declare class SeedService implements OnModuleInit {
    private readonly userRepo;
    private readonly roleRepo;
    private readonly permissionRepo;
    constructor(userRepo: Repository<UserEntity>, roleRepo: Repository<RoleEntity>, permissionRepo: Repository<PermissionEntity>);
    onModuleInit(): Promise<void>;
    seedAdminUser(): Promise<void>;
}
