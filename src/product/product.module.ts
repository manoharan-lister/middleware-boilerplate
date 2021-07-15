import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { ResponseHandler } from '../common/response';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ResponseHandler],
})
export class ProductModule {}
