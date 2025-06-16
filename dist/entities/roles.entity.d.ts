import { UserEntity } from './user.entity';
import { PermissionEntity } from './permissions.entity';
export declare class RoleEntity {
    id: number;
    name: string;
    users: UserEntity[];
    permissions: PermissionEntity[];
}
