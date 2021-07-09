import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findOne(id: string): any {
    return { id: 'product1', title: 'Red Dress', price: 12.5 };
  }
}
