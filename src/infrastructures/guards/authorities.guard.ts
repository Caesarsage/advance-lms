import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AUTHORITIES_KEY } from "../decorators/authorities.decorator";
import { ErrorCode } from "../enums";
import { Authority } from "../enums/authorities.enum";
import { LmsAccessException } from "../exceptions";


@Injectable()
export class AuthoritiesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredAuthorities = this.reflector.getAllAndOverride<Authority[]>(
      AUTHORITIES_KEY,
      [context.getHandler()]
    );
    if (!requiredAuthorities || requiredAuthorities.length === 0) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw LmsAccessException.of(ErrorCode.UNAUTHORIZED_REQUEST)
    }

    const has_authority = requiredAuthorities.some((authority) => user.authority?.includes(authority));

    if (!has_authority) {
      throw new LmsAccessException()
    }

    return true
  }
}