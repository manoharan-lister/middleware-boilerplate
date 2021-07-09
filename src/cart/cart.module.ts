import { Module } from '@nestjs/common';
import { CartsController } from './cart.controller';
import { CartsService } from './cart.service';

@Module({
  imports: [],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartModule {}
