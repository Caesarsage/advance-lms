import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';
import { Student } from '../entities/student.entity';
export class AddStudentDto {
  @IsNotEmpty({
    message: 'Address is required',
  })
  address: string;

  @IsOptional()
  bio: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsNotEmpty({
    message: 'First name is required',
  })
  first_name: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  last_name: string;

  @IsNotEmpty({
    message: 'Phone number is required',
  })
  phone_number: string;

  @IsNotEmpty({
    message: 'Terms and conditions is required',
  })
  terms_agreed: boolean;

  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;

  public toUserEntity = (): User => {
    const user = new User();
    user.username = this.email;
    user.email = this.email;
    user.first_name = this.first_name;
    user.last_name = this.last_name;
    user.phone_number = this.phone_number;
    
    return user;
  };

  public toStudentEntity = (): Student => {
    const student = new Student();
    if (!!this.address) {
      student.address = this.address;
    }
    return student;
  };
}
