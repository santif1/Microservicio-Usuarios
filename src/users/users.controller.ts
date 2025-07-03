import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { sign, verify } from 'jsonwebtoken';
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
  constructor(private service: UsersService, private readonly jwtService: JwtService, private readonly usersService: UsersService
   ) {}

  @UseGuards(AuthGuard)
  @Get('users')
  async findAll() {
  return this.service.findAll();
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
  console.log('🔍 request.user completo:', request.user);
  console.log('🔍 request.user.id:', request.user?.id);
  
  if (!request.user || !request.user.id) {
    throw new Error('Usuario no autenticado o ID faltante');
  }
  
  const userId = request.user.id;
  return this.service.getProfile(userId);
  }
  @UseGuards(AuthGuard)
  @Put('users/profile')
  async updateProfile(
    @Req() request: RequestWithUser,
    @Body() updateProfileDto: UpdateUserProfileDto
  ) {
    console.log('🔍 Datos a actualizar:', updateProfileDto);
    console.log('🔍 request.user:', request.user);
    
    if (!request.user || !request.user.id) {
      throw new Error('Usuario no autenticado o ID faltante');
    }
    
    const userId = request.user.id;
    
    try {
      const updatedUser = await this.service.updateProfile(userId, updateProfileDto);
      console.log('✅ Usuario actualizado:', { id: updatedUser.id, email: updatedUser.email });
      
      // ⭐ Si se cambió el email, generar un nuevo token
      if (updateProfileDto.email && updateProfileDto.email !== request.user.email) {
        // Usar tu método personalizado
        const newToken = this.jwtService.generateToken({ email: updatedUser.email });
        
        console.log('🔄 Email cambiado, generando nuevo token');
        
        return {
          user: updatedUser,
          access_token: newToken,
          message: 'Perfil actualizado. Token renovado debido al cambio de email.'
        };
      }

      // Si no se cambió el email, devolver solo el usuario
      return updatedUser;
      
    } catch (error) {
      console.error('❌ Error actualizando perfil:', error);
      throw new Error('Error al actualizar perfil');
    }
  }
  @UseGuards(AuthGuard)
  @Get('check-email/:email')
  async checkEmailExists(
  @Param('email') email: string,
  @Query('excludeUserId') excludeUserId?: string
  ) {
    const excludeId = excludeUserId ? parseInt(excludeUserId) : undefined;
    return this.service.checkEmailExists(email, excludeId);
  }
  @UseGuards(AuthGuard)
  @Get('users/:email')
  async findOne(@Param('email') email: string) {
    return this.service.findByEmail(email);
  }
}
