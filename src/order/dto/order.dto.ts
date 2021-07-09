import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: string;

  @ApiProperty()
  price: string;
}

export class OrderSuccessResponse {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: OrderDto;
}

export class OrderErrorResponse {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty()
  message: string;
}
