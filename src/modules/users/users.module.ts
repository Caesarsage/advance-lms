import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OauthTutorsModule } from '../oauth-tutors/oauth-tutors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    OauthTutorsModule,
    
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
