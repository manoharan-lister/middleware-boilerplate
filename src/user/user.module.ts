import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ValidateJwtMiddleware } from './middleware/validateJwt.middleware';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService],
})
// export class UserModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ValidateJwtMiddleware).forRoutes('users');
//   }
// }
export class UserModule {}
