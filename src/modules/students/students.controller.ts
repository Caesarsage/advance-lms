import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { AddStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Secured } from 'src/infrastructures/decorators/secured.decorator';
import { Authorization } from 'src/infrastructures/decorators/authorization.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('onboard')
  @Secured({
    basicAuth: true
  })
  addStudent(
    @Authorization() authorization: any,
    @Body() student_dto: AddStudentDto
  ) {
    return this.studentsService.addStudent(
      authorization,
      student_dto,
      true,
    );
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
