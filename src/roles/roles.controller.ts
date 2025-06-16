import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from 'src/interfaces/createRoleDto';

@Controller('roles')
export class RolesController {
    
    constructor( private readonly RolesService ){}

    @Post('roles')
    createRole( @Body() dto: createRoleDto ) {
        return this.RolesService.create();
    }

    @Get('roles')
    findAll(){
        return this.RolesService.findAll();
    }

    @Get('roles/:id')
    findOne(@Body('id') id: string) {
        return this.RolesService.findOne(id);
    }

    @Post('roles/:id/permissions')
    addPermissions(
        @Param('id') id: number,
        @Body() dto: { permissionIds: number[] }) {
        return this.RolesService.addPermissions(id, dto.permissionIds);
    }

    @Delete('role/:id')
    remove(@Param('id') id: number){
        return this.RolesService.remove(id);
    }
}
