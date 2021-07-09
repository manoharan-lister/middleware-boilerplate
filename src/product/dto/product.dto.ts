import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ default: 10 })
  stock: number;

  @ApiProperty({ default: 89.12 })
  price: number;
}

export class ProductSuccessResponse {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: ProductDto;
}

export class ProductErrorResponse {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty()
  message: string;
}
