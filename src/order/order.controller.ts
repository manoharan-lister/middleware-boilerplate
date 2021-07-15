import { Controller, Get, HttpStatus, Logger, Param, Res, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './order.service';
import { OrderSuccessResponse, OrderErrorResponse } from './dto/order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHandler } from '../common/response';

@ApiTags('orders')
@ApiResponse({ status: 400, description: 'Bad Request', type: OrderErrorResponse })
@ApiResponse({ status: 401, description: 'Unauthorized', type: OrderErrorResponse })
@ApiResponse({ status: 500, description: 'Internal Server Error', type: OrderErrorResponse })
@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(private readonly orderService: OrdersService, private readonly responseHandler: ResponseHandler) {}

  /**
   * Get order details by id
   * @param id
   * @param res
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get order details by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: OrderSuccessResponse,
  })
  getOne(@Param('id', new ParseIntPipe()) id: string, @Res() res: Response) {
    this.logger.log(`get order by id: ${id}`);
    const order = this.orderService.findOne(id);
    if (id != '1') throw new BadRequestException('Order not found');
    this.responseHandler.response(true, HttpStatus.OK, 'Order details', order, res);
  }
}
