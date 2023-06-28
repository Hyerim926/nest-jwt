import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../database/userDto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() userDTO: UserDto, @Res() res: Response): Promise<any> {
    const user = this.authService.findById(userDTO);

    if (!user || userDTO.password !== user.password) {
      return res.json({ message: '일치하는 회원정보가 없습니다' });
    }

    const jwt = this.authService.createToken(user.id, user.seq);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.setHeader('refreshToken', jwt.refreshToken);

    return res.json(jwt);
  }
}
