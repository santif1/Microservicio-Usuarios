import { RoleEntity } from './roles.entity';
export declare class PermissionEntity {
    id: number;
    name: string;
    roles: RoleEntity[];
}
