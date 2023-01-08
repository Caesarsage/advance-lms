import { User } from "src/modules/users/entities/user.emtity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import { Sector } from "src/modules/sector/entities/sector.entity";
import { BaseEntity } from "src/infrastructures/entities/base.entity";
import { instanceToPlain } from "class-transformer";

@Entity({ name: 'oauth_tutors' })
export class OAuthTutor extends BaseEntity {
  @Column()
  oauth_id: string;

  @Column({ unique: true })
  name: string;

  @JoinColumn({ name: 'sector_id', referencedColumnName: 'id' })
  @ManyToOne(() => Sector, (sector) => sector.tutor, { nullable: false } )
  sector_type: Sector;

  @Column({ unique: true })
  tutor_id: number;

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