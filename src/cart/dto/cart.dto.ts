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
