import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}
  private readonly logger = new Logger(ProductsController.name);

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('get product by id');
    const product = this.appService.findOne(id);
    res.status(HttpStatus.OK).json({ data: product });
  }
}
