import { Module } from '@nestjs/common';
import { OauthTutorsService } from './oauth-tutors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthTutor } from './entities/oauth-tutor.entity';
import { SectorModule } from '../sector/sector.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OAuthTutor]),
    SectorModule
  ],
  providers: [OauthTutorsService],
  exports: [OauthTutorsService]
})
export class OauthTutorsModule {}
