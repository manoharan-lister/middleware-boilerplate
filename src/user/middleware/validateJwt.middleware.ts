import { Injectable, Logger, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateJwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ValidateJwtMiddleware.name);
//   constructor(private readonly jwt: JwtService) {}
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, next: NextFunction) {
    if (req.headers['token']) {
      this.logger.log('Jwt auth Middleware called.');
      const token: any = req.headers['token'];
      const decodedToken = this.jwtService.verify(token, { secret: 'LISTER_MIDDLEWARE' });
      req.decodedToken = decodedToken;
    } else throw new HttpException('Unauthorised', 401);
    next();
  }
}
