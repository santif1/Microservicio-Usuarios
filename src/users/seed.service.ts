import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/roles.entity';
import { PermissionEntity } from '../entities/permissions.entity';
import * as bcrypt from 'bcrypt';
import { LargeNumberLike } from 'node:crypto';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,

    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
  ) {}

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
      'order_remove'
    ];

    const createdPermissions = await Promise.all(
      allPermissions.map(async (name) => {
        let permission = await this.permissionRepo.findOneBy({ name });
        if (!permission) {
          permission = this.permissionRepo.create({ name });
          await this.permissionRepo.save(permission);
        }
        return permission;
      }),
    );

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
    } else {
      console.log('⚠️  Usuario admin ya existía');
    }
  }
}