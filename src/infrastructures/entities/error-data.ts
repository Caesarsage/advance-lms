import { ValidationError } from '@nestjs/common';

export class ErrorData {
  field_name: string;
  message: string;

  constructor(field_name: string, message: string) {
    this.field_name = field_name;
    this.message = message;
  }

  static of(error: ValidationError): ErrorData {
    let message = 'Invalid data';
    if (error.constraints && Object.keys(error.constraints).length > 0) {
      message = error.constraints[Object.keys(error.constraints)[0]];
    }

    return new ErrorData(error.property, message);
  }
}
