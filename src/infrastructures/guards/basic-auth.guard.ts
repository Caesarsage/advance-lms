import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/modules/oauth/oauth.service";

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const oauth_tutor = await this.authService.validateOAuthTutor(
      request?.headers?.authorization
    );

    request.user = {...oauth_tutor, principal: oauth_tutor.oauth_id};
    return true;
  }
}