import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AnyExceptionFilter.name);
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    //const customErrorMessage = error['response']['error'] || error.message;
    const customMessage = error['response']['message'] || null;

    this.logger.log(`Error occured at path: status: ${status}`);
    response.status(status).json({
      success: false,
      message: customMessage,
    });
  }
}
