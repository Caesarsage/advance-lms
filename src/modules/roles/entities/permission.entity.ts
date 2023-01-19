import { BaseEntity } from "src/infrastructures/entities/base.entity";
import { Entity, Column, OneToMany } from "typeorm";
import { RolePermission } from "./role-permission.entity";

@Entity({ name: 'authorities' })
export class Permission extends BaseEntity{
  @Column({ default: false})
  is_admin: boolean;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => RolePermission, (role_permission) => role_permission.permission)
  role_permissions: RolePermission[];
}