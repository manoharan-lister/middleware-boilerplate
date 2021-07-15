import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ResponseHandler {
  private readonly logger = new Logger(ResponseHandler.name);
  response(status, statusCode, message, data, res) {
    this.logger.log(`response status: ${statusCode} message: ${message} data: ${data}`);
    res.status(statusCode).json({
      success: true,
      message,
      data: data,
    });
  }
}
