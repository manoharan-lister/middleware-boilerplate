import { Controller, Get, Res, Param, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './product.service';
import { ProductSuccessResponse, ProductErrorResponse } from './dto/product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {response} from '../common/response';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}
  private readonly logger = new Logger(ProductsController.name);

  @Get('feed')
  getFeed() {
    return this.appService.getProductFeed();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product details by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: ProductSuccessResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ProductErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ProductErrorResponse })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: ProductErrorResponse })
  findOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('get product by id');
    const product = this.appService.findOne(id);
    if(product){
      response(true,HttpStatus.OK,'Product details',product,res);
    }else{
      response(false,HttpStatus.BAD_REQUEST,'Product not found',null,res);
    }
  }
}
