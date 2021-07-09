import { ApiProperty } from '@nestjs/swagger';

export class Cookie {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  domain: string;

  @ApiProperty()
  expiredDate: string;

  @ApiProperty()
  isHttpOnly: boolean;

  @ApiProperty()
  isSecure: boolean;

  @ApiProperty()
  path: string;
}

export class WebviewDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  method: string;

  @ApiProperty({ type: [Cookie] })
  cookies: [Cookie];
}
