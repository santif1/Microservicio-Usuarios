import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import * as dayjs from 'dayjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RoleEntity } from '../entities/roles.entity';
import { UpdateUserProfileDto } from 'src/dto/updateuser.dto'; // ajustar ruta
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  repository = UserEntity;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
    ,private jwtService: JwtService,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}


  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({})
  }
  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  canDo(user: UserEntity, permission: string): boolean {
    const permissions = user.permissionCodes;
    if (!permissions || permissions.length === 0) {
      throw new UnauthorizedException();
    }
    const result = permissions.includes(permission);
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async register(body: RegisterDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, body);
      user.password = hashSync(user.password, 10);
      await this.userRepository.save(user);
      return { status: 'created' };
    } catch (error) {
      throw new HttpException('Error de creacion', 500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (user == null) {
      throw new UnauthorizedException();
    }
    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken(
        { email: user.email },
        'refresh',
      ),
      user: {
      id: user.id,
      email: user.email,
      // agregar otros campos que necesites
    }
    };
  }

  //Buscar perfil
  async getProfile(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'] // si tenés relaciones como roles, agregalas acá
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }


  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async assignRole(id: number, roleIds: number[]): Promise<string> {

    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const roles = await this.roleRepository.findBy({ id: In(roleIds) });
    user.roles = [...user.roles, ...roles];

    await this.userRepository.save(user);

    return 'Rol asignado con éxito';
  }
  //PERFIL
  async updateProfile(userId: number, updateProfileDto: UpdateUserProfileDto): Promise<UserEntity> {
    console.log('🔍 Actualizando usuario:', userId, updateProfileDto);
    
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Actualizar campos si están presentes
    if (updateProfileDto.email) {
      user.email = updateProfileDto.email;
    }

    if (updateProfileDto.password) {
      // ✅ Hashear la nueva contraseña
      const saltRounds = 10;
      user.password = await bcrypt.hash(updateProfileDto.password, saltRounds);
    }

    // Guardar cambios
    const updatedUser = await this.userRepository.save(user);
    console.log('✅ Usuario actualizado exitosamente');
    
    return updatedUser;
  }
  
}
