import { HttpStatus } from '@nestjs/common';
import { ErrorCode, getResponseCode } from '../enums';
import { LmsApiException } from './lms-api.exception';

export class LmsAccessException extends LmsApiException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN);
  }

  static of(error_code: ErrorCode): LmsAccessException {
    const exception = new LmsAccessException();
    exception.response_code = getResponseCode(error_code);
    exception.message = error_code;

    return exception;
  }
}
