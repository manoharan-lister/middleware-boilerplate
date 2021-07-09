import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({
    status: 200,
    description: 'fetch user details by id',
    type: CreateUserDto,
  })
  async getOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('get user by id');
    const user = await this.userService.findOne(id);
    res.status(HttpStatus.OK).json({ data: user });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    this.logger.log('create user');
    const user = await this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json({ data: user });
  }

  @Get('webview')
  getWebview(@Res({ passthrough: true }) res: Response) {
    this.logger.log('get webview');
    // res.status(HttpStatus.OK).json(user);
    res.cookie('chico', 'web-checkout-cookie');
  }
}
