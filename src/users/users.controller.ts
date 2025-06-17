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

@Controller()
export class UsersController {
  constructor(private service: UsersService, private readonly jwtService: JwtService) {}

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

  @Get('users/refresh-token')
  refreshToken(@Req() request: Request) {

    const token = request.headers['refresh-token'];
    if (!token || typeof token !== 'string') {
      throw new UnauthorizedException('No refresh token provided');
    }
    return this.jwtService.refreshToken(token);
  }


  @Post('users/:id/roles')
  assignRole(){
    
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
}
