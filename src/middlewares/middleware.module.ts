import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.middleware';
import { JwtModule } from '../jwt/jwt.module';
import { UsersModule } from '../users/users.module';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [UsersModule, JwtModule, Reflector],
  providers: [AuthGuard],
  exports: [AuthGuard], 
})
export class MiddlewaresModule {}