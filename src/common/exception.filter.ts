import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Unexpected error occured';
    if (exception instanceof HttpException) {
      status = 400;
      message = exception.getResponse();
    }

    if (exception instanceof NotFoundException) {
      status = 404;
      message = exception.getResponse();
    }

    if (exception instanceof UnauthorizedException) {
      status = 401;
      message = exception.getResponse();
    }

    this.logger.log(`Error occured at path: ${request.url} status: ${status}`);

    response.status(status).json({
      success: false,
      path: request.url,
      message,
    });
  }
}
