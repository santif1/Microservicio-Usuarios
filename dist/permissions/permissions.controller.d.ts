import { createPermissionDto } from 'src/interfaces/createPermissionDto';
export declare class PermissionsController {
    private readonly PermissionsService;
    constructor(PermissionsService: any);
    create(dto: createPermissionDto): any;
    findAll(): any;
    findOne(id: string): any;
    remove(id: number): any;
}
