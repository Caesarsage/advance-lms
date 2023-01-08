import { instanceToPlain } from "class-transformer";
import { BaseEntity } from "src/infrastructures/entities/base.entity";
import { User } from "src/modules/users/entities/user.emtity";
import { Entity, Column, JoinColumn, OneToOne } from "typeorm";

@Entity({ name: 'students' })
export class Student extends BaseEntity{
  @Column({unique: true})
  student_id: string;

  @Column()
  address: string

  @Column({ type: 'longtext', nullable: true })
  bio: string;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @OneToOne(() => User, (user) => user.student, { nullable: false })
  user: User;

  toJSON() {
    return instanceToPlain(this);
  }
}
