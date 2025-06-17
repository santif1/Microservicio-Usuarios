import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities';  
import { JwtService } from '../jwt/jwt.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from 'src/jwt/jwt.module';



@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    JwtModule
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService]
})
export class UsersModule {}
