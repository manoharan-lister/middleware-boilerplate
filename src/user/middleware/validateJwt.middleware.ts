import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ValidateJwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ValidateJwtMiddleware.name);

  use(req: any, res: Response, next: NextFunction) {
    this.logger.log('Jwt auth Middleware called.');

    if (req.headers['authorization']) {
      try {
        const token: any = req.headers['authorization'].split(' ')[1];
        const decodedToken = jwt.verify(token, 'LISTER_MIDDLEWARE');
        req.decodedToken = decodedToken;
        next();
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    } else throw new UnauthorizedException('Not authorized.');
  }
}
