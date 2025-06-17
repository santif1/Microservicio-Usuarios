import { createRoleDto } from 'src/interfaces/createRoleDto';
export declare class RolesController {
    private readonly RolesService;
    constructor(RolesService: any);
    createRole(dto: createRoleDto): any;
    findAll(): any;
    findOne(id: string): any;
    addPermissions(id: number, dto: {
        permissionIds: number[];
    }): any;
    remove(id: number): any;
}
