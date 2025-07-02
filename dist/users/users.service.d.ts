import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/roles.entity';
import { UpdateUserProfileDto } from 'src/dto/updateuser.dto';
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
        user: {
            id: number;
            email: string;
        };
    }>;
    getProfile(userId: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    assignRole(id: number, roleIds: number[]): Promise<string>;
    updateProfile(userId: number, updateProfileDto: UpdateUserProfileDto): Promise<UserEntity>;
}
