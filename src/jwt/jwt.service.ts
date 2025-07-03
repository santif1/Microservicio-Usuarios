import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as dayjs from 'dayjs';
import { Payload } from 'src/interfaces/payload';


@Injectable()
export class JwtService {
  constructor() {
    
  }
  // config.ts
  config = {
    auth: {
      secret: 'authSecret',
      expiresIn: '15m',
    },
    refresh: {
      secret: 'refreshSecret',
      expiresIn: '1d',
    },
  };
  generateToken(
    payload: { email: string },
    type: 'refresh' | 'auth' = 'auth',
  ): string {
    return sign(payload, this.config[type].secret, {
      expiresIn: this.config[type].expiresIn,
    });
  }
  // Método específico para regenerar token con nuevo email
  regenerateTokenWithNewEmail(email: string): string {
    return this.generateToken({ email: email }, 'auth');
  }

  refreshToken(refreshToken: string):{accessToken:string,refreshToken:string} {
    try {
      const payload = this.getPayload(refreshToken,'refresh')
      // Obtiene el tiempo restante en minutos hasta la expiración
      const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');
      return {
        accessToken: this.generateToken({ email: payload.email }),
        refreshToken:
          timeToExpire < 20
            ? this.generateToken({ email: payload.email }, 'refresh')
            : refreshToken
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  getPayload(token: string, type: 'refresh' | 'auth' = 'auth'): Payload {
    return verify(token, this.config[type].secret);
  }
}
