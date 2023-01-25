import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import appConfig from '../../config/app.config';
import { JwtStrategy } from './jwt.strategy';

import { AuthService } from './oauth.service';
import { AuthController } from './oauth.controller';

import { UsersModule } from '../users/users.module';
import { OauthTutorsModule } from '../oauth-tutors/oauth-tutors.module';

@Module({
  imports: [
    OauthTutorsModule,
    UsersModule,
    PassportModule,
    JwtModule.register({ secret: appConfig().jwtKey }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
