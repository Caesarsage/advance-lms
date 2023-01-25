import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ErrorCode } from "../enums";
import { LmsAccessException } from "../exceptions";


@Injectable()
export class UserOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
   
    if (!user) {
      throw LmsAccessException.of(ErrorCode.UNAUTHORIZED_REQUEST);
    } else if (user.client_login) {
      throw new LmsAccessException()
    }

    return true;
  }
}