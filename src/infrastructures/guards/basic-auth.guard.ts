import { CanActivate, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/modules/oauth/oauth.service";



@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService){}

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const oauth_tutor = await this.authService.validateOAuthTutor(
      request.headers.authorization
    );

    request.user = {...oauth_tutor, principal: oauth_tutor.tutor_id};
    return true;
}