import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Authority } from "../enums/authorities.enum";
import { AuthoritiesGuard } from "../guards/authorities.guard";


export const AUTHORITIES_KEY = 'authorities';
export const Authorities = (...authorities: Authority[]) => {
  return applyDecorators(
    SetMetadata(AUTHORITIES_KEY, authorities),
    UseGuards(AuthoritiesGuard),
  );
};