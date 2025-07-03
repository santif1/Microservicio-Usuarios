import { Payload } from 'src/interfaces/payload';
export declare class JwtService {
    constructor();
    config: {
        auth: {
            secret: string;
            expiresIn: string;
        };
        refresh: {
            secret: string;
            expiresIn: string;
        };
    };
    generateToken(payload: {
        email: string;
    }, type?: 'refresh' | 'auth'): string;
    regenerateTokenWithNewEmail(email: string): string;
    refreshToken(refreshToken: string): {
        accessToken: string;
        refreshToken: string;
    };
    getPayload(token: string, type?: 'refresh' | 'auth'): Payload;
}
