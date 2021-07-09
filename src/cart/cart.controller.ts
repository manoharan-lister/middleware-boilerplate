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
import { CartsService } from './cart.service';

@Controller('carts')
export class CartsController {
  private readonly logger = new Logger(CartsController.name);
  constructor(private readonly cartService: CartsService) {}

  @Get(':id')
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
