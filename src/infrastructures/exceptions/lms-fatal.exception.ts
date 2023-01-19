import { HttpStatus } from '@nestjs/common';

import { ErrorCode, getResponseCode } from '../enums';
import * as utils from '../../infrastructures/utils';
import { LmsApiException } from './lms-api.exception';

export class LmsFatalException extends LmsApiException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.SERVER_ERROR);
  }

  static of(error_code: ErrorCode): LmsFatalException {
    const exception = new LmsFatalException();
    exception.response_code = getResponseCode(error_code);
    exception.message = error_code;

    return exception;
  }

  static withMemo(message: string): LmsFatalException {
    utils.log(message);

    return new LmsFatalException();
  }
}
