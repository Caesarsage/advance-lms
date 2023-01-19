import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OauthTutorsService } from './oauth-tutors.service';
import { CreateOauthTutorDto } from './dto/create-oauth-tutor.dto';
import { UpdateOauthTutorDto } from './dto/update-oauth-tutor.dto';

@Controller('oauth-tutors')
export class OauthTutorsController {
  constructor(private readonly oauthTutorsService: OauthTutorsService) {}

  @Post()
  create(@Body() createOauthTutorDto: CreateOauthTutorDto) {
    return this.oauthTutorsService.create(createOauthTutorDto);
  }

  @Get()
  findAll() {
    return this.oauthTutorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oauthTutorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOauthTutorDto: UpdateOauthTutorDto) {
    return this.oauthTutorsService.update(+id, updateOauthTutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oauthTutorsService.remove(+id);
  }
}
