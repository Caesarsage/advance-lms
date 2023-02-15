import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/modules/oauth/oauth.service";

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);
    const oauth_tutor = await this.authService.validateOAuthClient(
      request?.headers?.authorization
    );

    console.log(oauth_tutor);
    request.user = {...oauth_tutor, principal: oauth_tutor.oauth_id};
    return true;
  }
}