import { Controller, Get, HttpStatus, Logger, Param, Res, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { CartsService } from './cart.service';
import { CartSuccessResponse, CartErrorResponse } from './dto/cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from '../common/response';
@ApiTags('carts')
@Controller('carts')
export class CartsController {
  private readonly logger = new Logger(CartsController.name);
  constructor(private readonly cartService: CartsService) {}

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
  @ApiResponse({ status: 400, description: 'Bad Request', type: CartErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: CartErrorResponse })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: CartErrorResponse })
  getOne(@Param('id', new ParseIntPipe()) id: string, @Res() res: Response) {
    this.logger.log(`get cart by id: ${id}`);
    // custom error
    if (id != '1') {
      response(false, HttpStatus.BAD_REQUEST, 'Cart not found', null, res);
    } else {
      const cart = this.cartService.findOne(id);
      response(true, HttpStatus.OK, 'Cart details', cart, res);
    }
  }
}
