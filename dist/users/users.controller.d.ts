import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { JwtService } from 'src/jwt/jwt.service';
import { RequestWithUser } from 'src/interfaces/request-user';
export declare class UsersController {
    private service;
    private readonly jwtService;
    constructor(service: UsersService, jwtService: JwtService);
    findAll(): Promise<import("../entities/user.entity").UserEntity[]>;
    findOne(email: string): Promise<import("../entities/user.entity").UserEntity>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(body: RegisterDTO): Promise<{
        status: string;
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
}
