import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { OauthTutorsModule } from '../oauth-tutors/oauth-tutors.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../oauth/oauth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    OauthTutorsModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}
