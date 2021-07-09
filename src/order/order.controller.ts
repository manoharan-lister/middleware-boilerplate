import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Res,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(private readonly orderService: OrdersService) {}

  @Get(':id')
  getOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('get order by id');
    if (id != '1') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'order not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const order = this.orderService.findOne(id);
    res.status(HttpStatus.OK).json({ data: order });
  }
}
