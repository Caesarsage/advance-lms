import { BaseEntity } from "src/infrastructures/entities/base.entity";
import { OAuthTutor } from "src/modules/oauth-tutors/entities/oauth-tutor.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('sector')
export class Sector extends BaseEntity{
  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => OAuthTutor, (oauthTutor) => oauthTutor.sector_type)
  tutors: OAuthTutor[];

  @OneToMany(() => User, (user => user.sector_type))
  users: User[];
}
