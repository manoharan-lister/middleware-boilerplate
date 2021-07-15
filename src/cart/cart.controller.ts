import { Controller, Get, HttpStatus, Logger, Param, Res, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { CartsService } from './cart.service';
import { CartSuccessResponse, CartErrorResponse } from './dto/cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHandler } from '../common/response';

@ApiTags('carts')
@ApiResponse({ status: 400, description: 'Bad Request', type: CartErrorResponse })
@ApiResponse({ status: 401, description: 'Unauthorized', type: CartErrorResponse })
@ApiResponse({ status: 500, description: 'Internal Server Error', type: CartErrorResponse })
@Controller('carts')
export class CartsController {
  private readonly logger = new Logger(CartsController.name);
  constructor(private readonly cartService: CartsService, private readonly responseHandler: ResponseHandler) {}

  /**
   * Cet cart details by id
   * @param id
   * @param res
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get cart details by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CartSuccessResponse,
  })
  getOne(@Param('id', new ParseIntPipe()) id: string, @Res() res: Response) {
    this.logger.log(`get cart by id: ${id}`);
    const cart = this.cartService.findOne(id);
    // custom error
    if (id != '1') throw new BadRequestException('Cart not found');
    this.responseHandler.response(true, HttpStatus.OK, 'Cart details', cart, res);
  }
}
