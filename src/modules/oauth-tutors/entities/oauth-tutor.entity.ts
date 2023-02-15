import { User } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Sector } from "src/modules/sector/entities/sector.entity";
import { BaseEntity } from "src/infrastructures/entities/base.entity";
import { Exclude, instanceToPlain } from "class-transformer";
import { Role } from "src/modules/roles/entities/role.entity";

@Entity({ name: 'oauth_tutors' })
export class OAuthTutor extends BaseEntity {
  @Column({ unique: true, nullable: true })
  oauth_id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  @Exclude({ toPlainOnly: true })
  encrypted_oauth_secret: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  hashed_oauth_secret: string;

  @JoinColumn({ name: 'sector_id', referencedColumnName: 'id' })
  @ManyToOne(() => Sector, (sector) => sector.tutors, { nullable: false } )
  sector_type: Sector;

  @OneToMany(() => Role, (role) => role.tutor)
  roles: Role[];

  @JoinTable({ 
    name: 'oauth_tutor_users',
    joinColumn: { 
      name: 'oauth_tutor_id', 
      referencedColumnName: 'id' 
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  @ManyToMany(() => User, (user) => user.tutors)
  users: User[];

  toJSON() {
    return instanceToPlain(this);
  }
}