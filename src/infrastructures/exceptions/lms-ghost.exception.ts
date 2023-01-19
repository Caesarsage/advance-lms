import { HttpStatus } from '@nestjs/common';
import { ErrorCode, getResponseCode } from '../enums';
import { LmsApiException } from './lms-api.exception';

export class LmsGhostException extends LmsApiException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
  }

  static of(error_code: ErrorCode): LmsGhostException {
    const exception = new LmsGhostException();
    exception.response_code = getResponseCode(error_code);
    exception.message = error_code;

    return exception;
  }
}
