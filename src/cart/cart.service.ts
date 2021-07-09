import { Injectable } from '@nestjs/common';

@Injectable()
export class CartsService {
  findOne(id: string): any {
    return {
      cartItems: [
        {
          id: id, //required
          productId: '', //required
          brand: '',
          color: '',
          isInStock: true, //required
          title: '', //required
          thumbnailUrl: '', //required
          quantity: 0, //required
          variantId: '', //required
          variantName: '', //required
          price: {
            now: 0, //required
            was: 0,
          },
        },
      ],
      total: {
        now: 0, //required
        was: 0,
      },
      customData: {},
    };
  }
}
