import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from './entities/role.entity';
import * as utils from 'src/infrastructures/utils';
import { LmsFatalException } from 'src/infrastructures/exceptions';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(RolePermission) private rolePermissionRepo: Repository<RolePermission>,
  ) {}

  getRoles = async(): Promise<Role[]> => {
    const query = this.roleRepo.createQueryBuilder('role')
      .leftJoinAndSelect('role.tutor', 'tutor');

    const roles = await query.getMany();

    return roles;
  }

  getStudentRole = async (): Promise<Role> => {
    const student_role = await this.roleRepo.findOne({
      where: {
        tutor: { 
          oauth_id: utils.STUDENT_CLIENT_ID 
        },
        name: 'Student',
      },
    });

    if (!student_role) {
      throw new LmsFatalException();
    }

    return student_role;
  };

}
