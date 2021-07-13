import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  findOne(id: string): any {
    return {
      items: [
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
      shipToAddress: {
        customerName: 'aaaaaa',
        address: 'test address',
        city: 'Denver',
        state: 'CO',
        postalCode: '80237-2632',
        country: 'US',
        phoneNo: '874287447',
      },
    };
  }
}
