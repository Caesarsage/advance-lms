import { HttpStatus, HttpException } from "@nestjs/common";
import { getResponseCode } from "../enums";
import { ErrorCode } from "../enums";

export class LmsApiException extends HttpException {
  public response_code: string;

  constructor(http_status: HttpStatus, error_code: ErrorCode) {
    super(error_code, http_status);

    this.response_code = getResponseCode(error_code);
  }

}