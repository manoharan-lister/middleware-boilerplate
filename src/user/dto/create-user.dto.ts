import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'firstname of user',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    required: true,
    description: 'lastname of user',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    required: true,
    description: 'email id of user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'password of user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserSuccessResponse {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: CreateUserDto;
}

export class UserErrorResponse {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty()
  message: string;
}

export class UserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
