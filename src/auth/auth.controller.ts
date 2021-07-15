import { Controller, Post, Body, Res, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseHandler } from '../common/response';
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authservice: AuthService,
    private readonly jwtService: JwtService,
    private readonly responseHandler: ResponseHandler,
  ) {}

  @Post('login')
  async login(@Body() body: UserDto, @Res() res: Response) {
    this.logger.log('login request');
    const user = await this.authservice.findOne(body.email);
    if (!user) {
      throw new BadRequestException('User not found');
    } else {
      const payload = {
        email: user.email,
        sub: user.firstname,
      };
      user.access_token = this.jwtService.sign(payload);
      this.responseHandler.response(true, HttpStatus.OK, 'User logged in successfully', user, res);
    }
  }
}
