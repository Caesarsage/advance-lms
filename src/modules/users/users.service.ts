import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSector } from 'src/infrastructures/enums/sector.enum';
import { LmsFatalException, LmsGhostException } from 'src/infrastructures/exceptions';
import { Repository } from 'typeorm';
import { OAuthTutor } from '../oauth-tutors/entities/oauth-tutor.entity';
import { Role } from '../roles/entities/role.entity';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import * as utils from '../../infrastructures/utils';
import { OauthTutorsService } from '../oauth-tutors/oauth-tutors.service';
import { Transactional } from 'typeorm-transactional';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly clientService: OauthTutorsService,
  ){}

  saveChanges = async (user:any, modified_by: string): Promise<User> => {
    user.modified_by = modified_by;
    const persisted_user = await this.userRepo.save(user);

    return persisted_user;
  }

  @Transactional()
  async addClientUser(
    oauth_client: OAuthTutor,
    user_dto: User,
    user_role: Role,
    added_by: string,
  ): Promise<User> {
    let client_user = await this.findByUsernameAndSectorId(
      user_dto.username,
      oauth_client.sector_type.id,
    );
    if (client_user) {
      throw new HttpException(
        {
          code: 400,
          message: `User with username ${user_dto.username} already exists`,
        },
        400,
      );
      // throw OrisUnprocessableException.of(ErrorCode.DUPLICATE_SECTOR_USER);
    }

    client_user = user_dto;
    client_user.roles = [user_role];
    client_user.sector_type = oauth_client.sector_type;
    client_user.created_by = added_by;
    // client_user.clients = [oauth_client.sales_client];    

    client_user = await this.saveChanges(client_user, added_by);
    if (!client_user) {
      throw LmsFatalException.withMemo('Unable to persist new user');
    }

    await this.clientService.addUserToTutor(oauth_client, client_user);
    return client_user;
  }

  findById = async (id: number): Promise<User> => {
    if (!id) {
      throw new LmsGhostException()
    }

    const user = await this.userRepo.findOne({
      where: {id},
    })

    if (!user) {
      throw new LmsGhostException()
    }

    return user;
  }

  findByUsernameAndSectorId = async (
    username: string | undefined,
    sector_id: number,
  ): Promise<User | null> => {
    if (!username) {
      return null;
    }

    return this.userRepo.findOne({
      where: { username, sector_type: { id: sector_id } },
      // relations: this.user_relations,
    });
  };

  findByUsername = async (
    username: string | undefined,
  ): Promise<User | null> => {
    if (!username) {
      return null;
    }

    return this.userRepo.findOne({
      where: { username },
    });
  };

  findByUsernameAndSectorCode = async (
    username: string | undefined,
    sector: AppSector,
  ): Promise<User | null> => {
    if (!username) {
      return null;
    }

    return this.userRepo.findOne({
      where: { username, sector_type: { code: sector } },
    });
  };

  findByUsernameOrSectorCode = async (
    username: string | undefined,
    sector: AppSector | undefined,
  ): Promise<User | null> => {
    if (!username) {
      return null;
    }

    return this.userRepo.findOne({
      where: { username, ...(sector && { sector: { code: sector } }) },
    });
  };

}
