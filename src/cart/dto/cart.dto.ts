import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: string;

  @ApiProperty()
  price: string;
}

// {
//   "cartItems": [
//       {
//           "id": "1",
//           "productId": "",
//           "brand": "",
//           "color": "",
//           "isInStock": true,
//           "title": "",
//           "thumbnailUrl": "",
//           "quantity": 0,
//           "variantId": "",
//           "variantName": "",
//           "price": {
//               "now": 0,
//               "was": 0
//           }
//       }
//   ],
//   "total": {
//       "now": 0,
//       "was": 0
//   },
//   "customData": {}
// }  

export class CartSuccessResponse {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: CartDto;
}

export class CartErrorResponse {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty()
  message: string;
}
