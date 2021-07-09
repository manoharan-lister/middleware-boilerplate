import { Controller, Get, HttpStatus, Logger, Param, Res, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { CartsService } from './cart.service';
import { CartSuccessResponse, CartErrorResponse } from './dto/cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  private readonly logger = new Logger(CartsController.name);
  constructor(private readonly cartService: CartsService) {}

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
  getOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('get cart by id');
    // custom error
    if (id != '1') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'cart not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const cart = this.cartService.findOne(id);
    res.status(HttpStatus.OK).json({ data: cart });
  }
}
