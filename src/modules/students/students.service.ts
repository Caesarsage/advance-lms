import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/infrastructures/enums';
import {
  LmsFatalException,
  LmsGhostException,
  LmsUnprocessableException,
} from 'src/infrastructures/exceptions';
import { Repository } from 'typeorm';
import {
  runOnTransactionCommit,
  runOnTransactionComplete,
  runOnTransactionRollback,
  Transactional,
} from 'typeorm-transactional';
import { RolesService } from '../roles/roles.service';
import { AddStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import * as utils from 'src/infrastructures/utils';
import { OauthTutorsService } from '../oauth-tutors/oauth-tutors.service';
import { EntityStatus } from 'src/infrastructures/enums/status.enum';
import { UsersService } from '../users/users.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly roleService: RolesService,
    private readonly clientService: OauthTutorsService,
    private userService: UsersService,
  ) {}

  @Transactional()
  async addStudent(
    authorization: any,
    student_dto: AddStudentDto,
    self_onboard: boolean,
  ): Promise<any> {
    if (self_onboard && !student_dto.terms_agreed) {
      throw LmsUnprocessableException.of(ErrorCode.MUST_AGREE_TO_TERMS);
    } else {
      const author = authorization.principal;
      const student_role = await this.roleService.getStudentRole();
      const student_client = await this.clientService.getClient(
        utils.STUDENT_CLIENT_ID,
      );
      // Create client primary user
      let student_user = student_dto.toUserEntity();
      const password_hash = await utils.hashString(student_dto.password);
      if (!password_hash) {
        throw new LmsFatalException();
      }

      student_user.password_hash = password_hash;
      student_user.is_email_verified = true;
      student_user.created_by = author;
      student_user.last_modified_by = author;

      student_user.status = EntityStatus.ACTIVE;

      student_user = await this.userService.addClientUser(
        student_client,
        student_user,
        student_role,
        author,
      );

      // Persist student
      let student = student_dto.toStudentEntity();
      student.user = student_user;
      student.status = EntityStatus.ACTIVE;
      student.student_id = uuid();
      student.created_by = author;
      student.last_modified_by = author;
      student = await this.studentRepo.save(student);

      runOnTransactionRollback(() => {
        console.log('Transaction rolled back');
        throw LmsGhostException.of(ErrorCode.TRANSACTION_ROLLBACK);
      })

      runOnTransactionCommit(() => {
        console.log('Transaction completed');
      });

      return student;
    }
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
