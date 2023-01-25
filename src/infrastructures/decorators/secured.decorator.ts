import { applyDecorators, UseGuards } from "@nestjs/common";
import { AppSectorGuard } from "../guards/app-sector.guard";


interface SecureConfig {
  basicAuth?: boolean | undefined;
  userOnly?: boolean | undefined;
  sector?: boolean | undefined;
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