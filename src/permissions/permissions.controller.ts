import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { createPermissionDto } from 'src/interfaces/createPermissionDto';

@Controller('permissions')
export class PermissionsController {

    constructor(
        private readonly PermissionsService
    ){}

    @Post('permissions')
    create(@Body() dto: createPermissionDto){
        return this.PermissionsService.create(dto);
    }

    @Get('permissions')
    findAll(){
        return this.PermissionsService.findAll();
    }
}
