import { Controller, Get, Post, Param, Body, Res, HttpStatus, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserDto, UserSuccessResponse, UserErrorResponse } from './dto/create-user.dto';
import { WebviewDto } from './dto/webview.dto';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly userService: UsersService) {}

  /**
   * get webview details
   * @param res
   */
  @Get('webview')
  @ApiOperation({ summary: 'Get webview details' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: WebviewDto,
  })
  async getView(@Res() res: Response) {
    this.logger.log('webview api called');
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'webview sample',
      data: {
        url: 'https://chicos.com/checkout/xxx',
        method: 'post',
        cookies: [
          {
            name: 'chico-checkout-xxxx',
            value: 'yyyy',
            domain: 'chicos.com',
            expiredDate: '2021-07-04',
            isHttpOnly: true,
            isSecure: true,
            path: '/',
          },
        ],
      },
    });
  }

  /**
   * get user by id
   * @param id
   * @param res
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: UserSuccessResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: UserErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: UserErrorResponse })
  @ApiResponse({ status: 500, description: 'Internal Server Error', type: UserErrorResponse })
  async getOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('get user by id');
    const user = await this.userService.findOne(id);
    res.status(HttpStatus.OK).json({ success: true, message: 'User retrieved sucessfully', data: user });
  }

  /**
   * create new user
   * @param createUserDto
   * @param res
   */
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: UserSuccessResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: UserErrorResponse })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    this.logger.log('create user');
    const user = await this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json({ success: true, message: 'User registered sucessfully', data: user });
  }
}
