import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSector } from 'src/infrastructures/enums/sector.enum';
import { LmsFatalException } from 'src/infrastructures/exceptions';
import { Repository } from 'typeorm';
import { SectorService } from '../sector/sector.service';
import { User } from '../users/entities/user.entity';
import { CreateOauthTutorDto } from './dto/create-oauth-tutor.dto';
import { UpdateOauthTutorDto } from './dto/update-oauth-tutor.dto';
import { OAuthTutor } from './entities/oauth-tutor.entity';

@Injectable()
export class OauthTutorsService {
  constructor(
    @InjectRepository(OAuthTutor) private readonly oAuthTutorRepository: Repository<OAuthTutor>,
    private sectorService: SectorService
  ){}

  saveChanges = async (oauth_tutor: OAuthTutor) => {
    await this.oAuthTutorRepository.save(oauth_tutor);
    return await this.findByName(oauth_tutor.name)
  }

  findByOAuthId = async (oauth_id: string): Promise<OAuthTutor> => {
    const oauthTutor = await this.oAuthTutorRepository.findOne({
      where: {oauth_id},
      relations: ['sector_type']
    })

    return oauthTutor
  }

  getClient = async (oauth_id: string): Promise<OAuthTutor> => {
    const oauth_client = await this.findByOAuthId(oauth_id);
    if (!oauth_client) {
      throw new LmsFatalException();
    }

    return oauth_client;
  };

  addUserToTutor = async (oauth_tutor: OAuthTutor, member_user: User) => {
    return this.oAuthTutorRepository
      .createQueryBuilder()
      .relation(OAuthTutor, 'users')
      .of(oauth_tutor)
      .add(member_user)
  }

  addTutor = async (
    oauth_tutor: OAuthTutor,
    author: string,
  ): Promise<OAuthTutor> => {
    const tutor_sector = await this.sectorService.findBySectorCode(
      AppSector.TEACHER
    )

    oauth_tutor.sector_type = tutor_sector,
    oauth_tutor.created_by = author
    oauth_tutor.last_modified_by = author

    return this.saveChanges(oauth_tutor)
  }

  private findByName = async (name: string): Promise<OAuthTutor> => {
    const oauth_tutor = await this.oAuthTutorRepository.findOne({
      where: {name},
      relations: ['sector_type']
    })

    if (!oauth_tutor) {
      throw new LmsFatalException()
    }

    return oauth_tutor
  }
}
