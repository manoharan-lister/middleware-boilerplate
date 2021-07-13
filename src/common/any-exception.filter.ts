import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {

    const response = host.switchToHttp().getResponse();

    const status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    //const customErrorMessage = error['response']['error'] || error.message;
    const customMessage =error['response']['message'] || null;
    response
      .status(status)
      .json({
        success:false,
        message:customMessage
      });
  }
}