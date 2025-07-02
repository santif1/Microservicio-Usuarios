import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { JwtService} from 'src/jwt/jwt.service';
import { AuthGuard } from '../middlewares/auth.middleware';
import { RequestWithUser } from 'src/interfaces/request-user';
import { Put } from '@nestjs/common';
import { UpdateUserProfileDto } from 'src/dto/updateuser.dto'; // ajustar la ruta según tu estructura


@Controller()
export class UsersController {
  constructor(private service: UsersService, private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('users')
  async findAll() {
  return this.service.findAll();
  }


  @UseGuards(AuthGuard)
  @Get('users/:email')
  async findOne(@Param('email') email: string) {
  return this.service.findByEmail(email);
  }

  @Post('users/login')
  login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  @Post('users/register')
  register(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }
  @UseGuards(AuthGuard)
  @Get('can-do/:permission')
  canDo(
    @Req() request: RequestWithUser,
    @Param('permission') permission: string,
  ) {
    return this.service.canDo(request.user, permission);
  }

  @Post('users/refresh-token')
  refreshToken(@Req() request: Request) {

    const token = request.headers['refresh-token'];
    if (!token || typeof token !== 'string') {
      throw new UnauthorizedException('No refresh token provided');
    }
    return this.jwtService.refreshToken(token);
  }


  @Post('users/:id/roles')
  assignRole(
    @Param('id') id: number,
    @Body() dto: { roleIds: number[]}
  ){
    return this.service.assignRole(id, dto.roleIds);
  }

  @Post('can-do')
  @UseGuards(AuthGuard)
  canDoMultiple(
    @Req() request: RequestWithUser,
    @Body() body: { permissions: string[] }
    ) {
    const allowed = body.permissions.every(p => this.service.canDo(request.user, p));
    return { allowed };
  }
  //PERFIL
  @UseGuards(AuthGuard)
  @Get('users/profile')
  async getProfile(@Req() request: RequestWithUser) {
   // 🔍 DEBUG: Verificar qué hay en request.user
  console.log('🔍 request.user completo:', request.user);
  console.log('🔍 request.user.id:', request.user?.id);
  console.log('🔍 Tipo de request.user.id:', typeof request.user?.id);
  
  if (!request.user || !request.user.id) {
    throw new Error('Usuario no autenticado o ID faltante');
  }
  
  const userId = request.user.id;
  return this.service.getProfile(userId);
  }
  @UseGuards(AuthGuard)
  @Put('profile')
  async updateProfile(
    @Req() request: RequestWithUser,
    @Body() updateProfileDto: UpdateUserProfileDto // ✅ Usar el DTO
  ) {
    console.log('🔍 Datos a actualizar:', updateProfileDto);
    const userId = request.user.id;
    
    try {
      const updatedUser = await this.usersService.updateProfile(userId, updateProfileDto);
      console.log('✅ Usuario actualizado:', { id: updatedUser.id, email: updatedUser.email });
      return updatedUser;
    } catch (error) {
      console.error('❌ Error actualizando perfil:', error);
      throw new Error('Error al actualizar perfil');
    }
  }
}
