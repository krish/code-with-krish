import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        if (req.headers.authorization) {
          return req.headers.authorization.split(' ')[0];
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: 'abc@123',
    });
  }
  validate(payload: any) {
    return {
      userId: payload.sub,
      name: payload.name,
      permissions: payload.permissions,
    };
  }
}
