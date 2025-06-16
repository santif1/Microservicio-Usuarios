import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
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

    @Get('permissions/:id')
    findOne(@Body('id') id:string){
        return this.PermissionsService.findOne(id);
    }

    @Delete('permissions/:id')
    remove(@Param('id') id:number){
        return this.PermissionsService.remove(id);
    }
}
