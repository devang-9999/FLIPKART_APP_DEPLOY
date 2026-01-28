import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { StrategyOptions } from 'passport-jwt';

export interface JwtPayload {
  userid: number;
  useremail: string;
  role: string;
}

export interface JwtUser {
  userid: number;
  useremail: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const options = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY_123',
    } as const;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(options as StrategyOptions);
  }

  validate(payload: JwtPayload): JwtUser {
    return {
      userid: payload.userid,
      useremail: payload.useremail,
      role: payload.role,
    };
  }
}
