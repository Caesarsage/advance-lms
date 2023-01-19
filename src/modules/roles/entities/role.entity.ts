import { BaseEntity } from "src/infrastructures/entities/base.entity";
import { OAuthTutor } from "src/modules/oauth-tutors/entities/oauth-tutor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { RolePermission } from "./role-permission.entity";

@Unique('UQ_tutor_role', ['tutor', 'name'])
@Entity({ name: 'roles' })
export class Role extends BaseEntity{
  @JoinColumn({ name: 'oauth_tutor_id', referencedColumnName: 'id' })
  @ManyToOne(() => OAuthTutor, (oauth_tutor) => oauth_tutor.roles, { nullable: false })
  tutor: OAuthTutor;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false})
  is_super: boolean;

  @OneToMany(() => RolePermission, (role_permission) => role_permission.role)
  role_permissions: RolePermission[];
  
}
