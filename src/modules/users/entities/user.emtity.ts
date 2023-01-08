import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'src/infrastructures/entities/base.entity';
import { EntityStatus } from 'src/infrastructures/enums/statatus.enum';
import { OAuthTutor } from 'src/modules/oauth_tutors/entities/oauth-tutor.entities';
import { Sector } from 'src/modules/sector/entities/sector.entity';
import { Student } from 'src/modules/students/entities/student.entity';
import { 
  Entity, 
  Column, 
  Unique,  
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToOne
} from 'typeorm';

@Entity({ name: 'users' })
@Unique('UQ_email_username', ['email', 'username'])
export class User extends BaseEntity{
  @Column()
  email: string;

  @Column({ default: false })
  is_email_verified: boolean;

  @JoinColumn({ name: 'sector_id', referencedColumnName: 'id' })
  @ManyToOne(() => Sector, (sector) => sector.users, { nullable: false } )
  sector_type: Sector;

  @Column()
  status: EntityStatus

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true , length: 25})
  phone_number: string;

  @Column({ default: false })
  is_phone_number_verified: boolean;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column()
  @Exclude({ toPlainOnly: true})
  password_hash: string;

  @Column({ default: false })
  two_factor_enabled: boolean;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ width: 4, default: 0 })
  @Exclude({ toPlainOnly: true})
  failed_login_attempts: number;

  @ManyToMany(() => OAuthTutor, (tutor) => tutor.users)
  tutors: OAuthTutor[];

  @OneToOne(()=> Student, (student) => student.user)
  student: Student;

  toJSON() {
    return instanceToPlain(this)
  }
}