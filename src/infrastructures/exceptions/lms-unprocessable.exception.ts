import { HttpStatus } from '@nestjs/common';
import { ErrorCode, getResponseCode } from '../enums';
import { LmsApiException } from './lms-api.exception';

export class LmsUnprocessableException extends LmsApiException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ErrorCode.UNPROCESSABLE_ENTITY);
  }

  static of(
    error_code: ErrorCode,
    message: string | undefined = undefined,
  ): LmsUnprocessableException {
    const exception = new LmsUnprocessableException();
    exception.response_code = getResponseCode(error_code);
    exception.message = error_code;

    if (!!message) {
      exception.message = message;
    }

    return exception;
  }
}
