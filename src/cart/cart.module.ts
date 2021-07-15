import { Module } from '@nestjs/common';
import { CartsController } from './cart.controller';
import { CartsService } from './cart.service';
import { ResponseHandler } from '../common/response';

@Module({
  imports: [],
  controllers: [CartsController],
  providers: [CartsService, ResponseHandler],
})
export class CartModule {}
