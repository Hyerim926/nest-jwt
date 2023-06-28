import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.DEFAULT_SECRET,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(
    request: Request,
    payload: {
      sub: { id: string; seq: number; type: string };
      iat: number;
      exp: number;
    },
  ) {
    // access token 아님
    if (payload.sub.type !== 'access') {
    }

    return { sub: { id: payload.sub.id, seq: payload.sub.seq } };
  }
}
