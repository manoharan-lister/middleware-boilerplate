import { Controller, Post, Body, Res, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authservice: AuthService, private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: UserDto, @Res() res: Response) {
    this.logger.log('login request');
    const user = await this.authservice.findOne(body.email);
    if (!user) {
      throw new HttpException(
        {
          error: {
            success: false,
            message: 'User not found',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const payload = { email: user.email, sub: user.firstname };
      (user.access_token = this.jwtService.sign(payload)), res.status(HttpStatus.OK).json({ data: user });
    }
  }
}
