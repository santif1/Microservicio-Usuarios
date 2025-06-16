import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './roles.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})
  @Column()
  email: string;
  @Column()
  password: string;

  @ManyToMany(()=> RoleEntity, role => role.users, { eager: true })
  @JoinTable({name: 'users_roles'})
  roles: RoleEntity[];

  get permissionCodes() {
    return this.roles.flatMap(role => role.permissions.map(p => p.name));
  }

}
