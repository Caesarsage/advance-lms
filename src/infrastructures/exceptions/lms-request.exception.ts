import { HttpStatus, ValidationError } from '@nestjs/common';
import { ErrorData } from '../entities/error-data';
import { ErrorCode, getResponseCode } from '../enums';
import { LmsApiException } from './lms-api.exception';

export class LmsRequestException extends LmsApiException {
  public errors: ErrorData[];

  constructor() {
    super(HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
  }

  static of(error_code: ErrorCode): LmsRequestException {
    const exception = new LmsRequestException();
    exception.response_code = getResponseCode(error_code);
    exception.message = error_code;

    return exception;
  }

  static ofErrors(errorList: ValidationError[] = []): LmsRequestException {
    const exception = new LmsRequestException();
    const errors: ErrorData[] = [];
    errorList.forEach((error) => {
      if (!error.children || error.children.length === 0) {
        errors.push(ErrorData.of(error));
      } else {
        error.children.forEach((child, index) => {
          const child_errors: ErrorData[] | undefined = child.children?.map(
            (child_error: ValidationError) => {
              const error_details = ErrorData.of(child_error);
              return new ErrorData(
                `${error.property}[${index}].${child_error.property}`,
                error_details.message,
              );
            },
          );

          if (child_errors) {
            errors.push(...child_errors);
          }
        });
      }
    });

    exception.errors = errors;

    return exception;
  }
}
