import { HttpStatus } from '@nestjs/common';
import { ErrorCode, getResponseCode } from '../enums';
import { LmsApiException } from './lms-api.exception';

export class LmsAuthException extends LmsApiException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED_REQUEST);
  }

  static of(error_code: ErrorCode): LmsAuthException {
    const exception = new LmsAuthException();
    exception.response_code = getResponseCode(error_code);
    exception.message = error_code;

    return exception;
  }
}
