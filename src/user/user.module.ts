import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { ValidateJwtMiddleware } from './middleware/validateJwt.middleware';
import { ResponseHandler } from '../common/response';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, ResponseHandler],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateJwtMiddleware).forRoutes('users');
  }
}
// export class UserModule {}
