import { applyDecorators, UseGuards } from "@nestjs/common";
import { AppSector } from "../enums/sector.enum";
import { JwtAuthGuard, UserOnlyGuard } from "../guards";
import { AppSectorGuard } from "../guards/app-sector.guard";
import { BasicAuthGuard } from "../guards/basic-auth.guard";


interface SecureConfig {
  basicAuth?: boolean | undefined;
  userOnly?: boolean | undefined;
  sector?: AppSector | undefined;
}
export const Secured = (
  config: SecureConfig = {
    basicAuth: false,
    userOnly: false,
    sector: undefined
  }
) => {
  const guards: any[] = config.basicAuth ? [BasicAuthGuard] : [JwtAuthGuard];
  if (config.userOnly) {
    guards.push(UserOnlyGuard);
  }

  if (!!config.sector) {
    guards.push(new AppSectorGuard(config.sector));
  }
  return applyDecorators(UseGuards(...guards))
}