import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSector } from 'src/infrastructures/enums/sector.enum';
import { LmsGhostException } from 'src/infrastructures/exceptions';
import { Repository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: BaseRepository<User>
  ){}

  saveChanges = async (user:any, modified_by: string): Promise<User> => {
    user.modified_by = modified_by;
    const persisted_user = await this.userRepo.save(user);

    return persisted_user;
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
