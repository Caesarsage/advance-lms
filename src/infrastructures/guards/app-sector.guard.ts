import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ErrorCode } from "../enums";
import { AppSector } from "../enums/sector.enum";
import { LmsAccessException } from "../exceptions";


@Injectable()
export class AppSectorGuard implements CanActivate {
  constructor(private sector: AppSector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (user?.sector !== this.sector) {
      throw LmsAccessException.of(ErrorCode.UNAUTHORIZED_REQUEST)
    }

    return true;
  }
}