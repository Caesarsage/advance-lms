import { Module } from '@nestjs/common';
import { OauthTutorsService } from './oauth-tutors.service';
import { OauthTutorsController } from './oauth-tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthTutor } from './entities/oauth-tutor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OAuthTutor])
  ],
  controllers: [OauthTutorsController],
  providers: [OauthTutorsService]
})
export class OauthTutorsModule {}
