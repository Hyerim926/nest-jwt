import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { userData } from '../database/dummyData';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  findById(user: UserDto): UserDto | undefined {
    return userData.find((obj) => obj.id === user.id);
  }

  createToken(id: string, seq: number): { accessToken: string } {
    const payload: JwtPayloadDto = { id: id, seq: seq };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  validateUser(
    payload: JwtPayloadDto,
  ): { seq: number; id: string } | undefined {
    const result = userData.find((obj) => obj.id === payload.id);

    if (result) {
      return { seq: result.seq, id: result.id };
    }
    return undefined;
  }
}
