import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorCode, getResponseCode } from '../enums';
import { LmsApiException, LmsRequestException } from '../exceptions';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    let httpStatus = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const errors = exception instanceof LmsRequestException ? exception.errors : []
    let code = getResponseCode(ErrorCode.SERVER_ERROR)
    let message = ErrorCode.SERVER_ERROR.toString()
    if (exception instanceof LmsApiException) {
      code = exception.response_code;
      message = exception.message;
    } else if (exception instanceof UnauthorizedException) {
      httpStatus = HttpStatus.FORBIDDEN;
      code = getResponseCode(ErrorCode.UNAUTHORIZED_REQUEST)
      message = ErrorCode.UNAUTHORIZED_REQUEST;
    } else if (exception instanceof ServiceUnavailableException) {
      httpStatus = HttpStatus.SERVICE_UNAVAILABLE;
      code = getResponseCode(ErrorCode.SERVICE_UNAVAILABLE)
      message = ErrorCode.SERVICE_UNAVAILABLE;
    } else if (exception instanceof HttpException) {
      code = httpStatus + '00';
      message = exception.message;
    }

    const { httpAdapter } = this.httpAdapterHost;
    const response_body: any = {
      code,
      message,
      errors,
      success: false,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    }

    if (exception instanceof ServiceUnavailableException) {
      response_body.message = exception.message;
    }

    console.error(exception);
    httpAdapter.reply(ctx.getResponse(), response_body, httpStatus);
  }
}
