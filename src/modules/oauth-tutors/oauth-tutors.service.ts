import { Injectable } from '@nestjs/common';
import { CreateOauthTutorDto } from './dto/create-oauth-tutor.dto';
import { UpdateOauthTutorDto } from './dto/update-oauth-tutor.dto';

@Injectable()
export class OauthTutorsService {
  create(createOauthTutorDto: CreateOauthTutorDto) {
    return 'This action adds a new oauthTutor';
  }

  findAll() {
    return `This action returns all oauthTutors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oauthTutor`;
  }

  update(id: number, updateOauthTutorDto: UpdateOauthTutorDto) {
    return `This action updates a #${id} oauthTutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} oauthTutor`;
  }
}
