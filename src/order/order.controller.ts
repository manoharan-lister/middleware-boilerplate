import { Controller, Get, HttpStatus, Logger, Param, Res, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './order.service';
import { OrderSuccessResponse, OrderErrorResponse } from './dto/order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from '../common/response';
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(private readonly orderService: OrdersService) {}

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
  @ApiResponse({ status: 400, description: 'Bad Request', type: OrderErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: OrderErrorResponse })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: OrderErrorResponse })
  getOne(@Param('id', new ParseIntPipe()) id: string, @Res() res: Response) {
    this.logger.log(`get order by id: ${id}`);
    if (id != '1') {
      response(false, HttpStatus.BAD_REQUEST, 'Order not found', null, res);
    } else {
      const order = this.orderService.findOne(id);
      response(true, HttpStatus.OK, 'Order details', order, res);
    }
  }
}
