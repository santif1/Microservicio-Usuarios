import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permissions.entity';

@Entity('roles')
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=> UserEntity, user => user.roles)
    users: UserEntity[];

    @ManyToMany(()=> PermissionEntity, permission => permission.roles, { eager: true })
    @JoinTable({ name: 'roles_permissions' })
    permissions: PermissionEntity[];

}