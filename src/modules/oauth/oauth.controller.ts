import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Body,
} from '@nestjs/common';

import { AuthService } from './oauth.service';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers('authorization') basic_auth: string,
    @Body() login_dto: LoginDto,
  ) {
    const login = await this.authService.getAccessToken(basic_auth, login_dto);
    return login;
  }
}
