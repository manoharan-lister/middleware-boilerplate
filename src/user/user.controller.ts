import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  HttpStatus,
  Logger,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserDto, UserSuccessResponse, UserErrorResponse } from './dto/create-user.dto';
import { WebviewDto } from './dto/webview.dto';
import { Response } from 'express';
import { ResponseHandler } from '../common/response';

@ApiTags('users')
@ApiResponse({ status: 400, description: 'Bad Request', type: UserErrorResponse })
@ApiResponse({ status: 401, description: 'Unauthorized', type: UserErrorResponse })
@ApiResponse({ status: 500, description: 'Internal Server Error', type: UserErrorResponse })
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly userService: UsersService, private readonly responseHandler: ResponseHandler) {}

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
    const data = this.userService.getWebview();
    res.cookie('checkout', '123-456-789', {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    this.responseHandler.response(true, HttpStatus.OK, 'Webview sample', data, res);
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
  async getOne(@Param('id', new ParseIntPipe()) id: string, @Res() res: Response) {
    this.logger.log(`get user by id: ${id}`);
    const user = await this.userService.findOne(id);
    if (!user) throw new BadRequestException('User not found');
    this.responseHandler.response(true, HttpStatus.OK, 'User retrieved successfully', user, res);
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
    this.responseHandler.response(true, HttpStatus.CREATED, 'User registered successfully', user, res);
  }
}
