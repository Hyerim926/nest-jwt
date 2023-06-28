import { Injectable } from '@nestjs/common';
import { UserDto } from '../database/userDto';
import { userData } from '../database/dummyData';
import { JwtService } from '@nestjs/jwt';
import * as jsonwebtoken from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  findById(user: UserDto): UserDto | undefined {
    return userData.find((obj) => obj.id === user.id);
  }

  createToken(
    id: string,
    seq: number,
  ): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.jwtService.sign(
        { sub: { seq, id, type: 'access' } },
        { expiresIn: '2h' },
      ),
      refreshToken: this.jwtService.sign(
        { sub: { seq, id, type: 'refresh' } },
        { expiresIn: '30days' },
      ),
    };
  }

  validateRefreshToken(refreshToken) {
    try {
      jsonwebtoken.verify(refreshToken, process.env.JWT_SECRET);
      return true;
    } catch (e) {
      return false;
    }
  }

  validateAccessToken(accessToken) {
    try {
      jsonwebtoken.verify(accessToken, process.env.JWT_SECRET);
      return 1;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        return 0;
      }
      return -4;
    }
  }
}
