import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/roles.entity';
export declare class UsersService {
    private readonly userRepository;
    private jwtService;
    private readonly roleRepository;
    repository: typeof UserEntity;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService, roleRepository: Repository<RoleEntity>);
    findAll(): Promise<UserEntity[]>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    canDo(user: UserEntity, permission: string): boolean;
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    findByEmail(email: string): Promise<UserEntity>;
    assignRole(id: number, roleIds: number[]): Promise<string>;
}
