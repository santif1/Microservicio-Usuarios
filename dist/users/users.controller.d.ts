import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { JwtService } from 'src/jwt/jwt.service';
import { RequestWithUser } from 'src/interfaces/request-user';
import { UpdateUserProfileDto } from 'src/dto/updateuser.dto';
export declare class UsersController {
    private service;
    private readonly jwtService;
    private readonly usersService;
    constructor(service: UsersService, jwtService: JwtService, usersService: UsersService);
    findAll(): Promise<import("../entities/user.entity").UserEntity[]>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
        };
    }>;
    register(body: RegisterDTO): Promise<{
        status: string;
        message: string;
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
        };
    }>;
    canDo(request: RequestWithUser, permission: string): boolean;
    refreshToken(request: Request): {
        accessToken: string;
        refreshToken: string;
    };
    assignRole(id: number, dto: {
        roleIds: number[];
    }): Promise<string>;
    canDoMultiple(request: RequestWithUser, body: {
        permissions: string[];
    }): {
        allowed: boolean;
    };
    getProfile(request: RequestWithUser): Promise<import("../entities/user.entity").UserEntity>;
    updateProfile(request: RequestWithUser, updateProfileDto: UpdateUserProfileDto): Promise<import("../entities/user.entity").UserEntity | {
        user: import("../entities/user.entity").UserEntity;
        access_token: string;
        message: string;
    }>;
    checkEmailExists(email: string, excludeUserId?: string): Promise<boolean>;
    findOne(email: string): Promise<import("../entities/user.entity").UserEntity>;
}
