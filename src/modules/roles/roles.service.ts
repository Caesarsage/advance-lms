import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: BaseRepository<Role>,
    @InjectRepository(RolePermission) private rolePermissionRepo: BaseRepository<RolePermission>,
  ) {}

  getRoles = async(): Promise<Role[]> => {
    const query = this.roleRepo.createQueryBuilder('role')
      .leftJoinAndSelect('role.tutor', 'tutor');

    const roles = await query.getMany();

    return roles;
  }

}
