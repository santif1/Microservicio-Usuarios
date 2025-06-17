import { Controller, Post, Get, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from 'src/interfaces/createRoleDto';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware'
 

@Controller('roles')
export class RolesController {

    constructor( private readonly RolesService: RolesService ){}

    @UseGuards(AuthGuard)
    @Permissions(['create_roles'])
    @Post()
    createRole( @Body() dto: createRoleDto ) {
        return this.RolesService.create(dto);
    }
    
    @Get()
    findAll(){
        return this.RolesService.findAll();
    }

    @Get(':id')
    findOne(@Body('id') id: string) {
        return this.RolesService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Permissions(['add_permissions'])
    @Post(':id/permissions')
    addPermissions(
        @Param('id') id: number,
        @Body() dto: { permissionIds: number[] }) {
        return this.RolesService.addPermissions(id, dto.permissionIds);
    }


    @UseGuards(AuthGuard)
    @Permissions(['delete_roles'])
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.RolesService.remove(id);
    }
}
