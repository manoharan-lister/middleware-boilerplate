import { Module } from '@nestjs/common';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { ResponseHandler } from '../common/response';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ResponseHandler],
})
export class OrderModule {}
