import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        database: 'users',
        username: 'postgres',
        password: 'postgres1',
        synchronize: true,
        dropSchema: true,
        entities,
    }),
    TypeOrmModule.forFeature(entities),
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController,UsersController],
  providers: [AuthGuard, JwtService, UsersService],
})
export class AppModule {}
