import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { entities } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities)
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
