import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dto/jwt.payload.dto';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: JwtPayloadDto, done: VerifiedCallback): any {
    const user = this.authService.validateUser(payload);
    if (!user) {
      return done(
        new UnauthorizedException({ message: '해당하는 유저 없음' }),
        false,
      );
    }
    return done(null, user);
  }
}
