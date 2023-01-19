import { PartialType } from '@nestjs/mapped-types';
import { CreateOauthTutorDto } from './create-oauth-tutor.dto';

export class UpdateOauthTutorDto extends PartialType(CreateOauthTutorDto) {}
