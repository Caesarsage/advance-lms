import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { SectorModule } from './modules/sector/sector.module';
import { StudentsModule } from './modules/students/students.module';
import { RolesModule } from './modules/roles/roles.module';
import { OauthTutorsModule } from './modules/oauth-tutors/oauth-tutors.module';
import { AuthModule } from './modules/oauth/oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    SectorModule,
    StudentsModule,
    RolesModule,
    OauthTutorsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
