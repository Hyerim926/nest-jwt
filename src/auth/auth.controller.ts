import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signIn(@Body() userDto: UserDto, @Res() res: Response): any {
    const user = this.authService.findById(userDto);

    if (!user || userDto.password !== user.password) {
      return res.json({ message: '일치하는 회원정보가 없습니다' });
    }

    const jwt = this.authService.createToken(user.id, user.seq);
    res.setHeader('authorization', 'Bearer ' + jwt.accessToken);

    return res.json(jwt);
  }

  @Get('/info')
  @UseGuards(AuthGuard)
  getUserInfo(@Req() req: Request): any {
    return req.user;
  }
}
