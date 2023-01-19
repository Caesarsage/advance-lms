import { BaseEntity } from "src/infrastructures/entities/base.entity";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";

@Entity({ name: 'role_authorities' })
export class RolePermission extends BaseEntity{
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  @ManyToOne(() => Role, (role) => role.role_permissions, { nullable: false })
  role: Role;

  @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
  @ManyToOne(() => Permission, (permission) => permission.role_permissions, { nullable: false })
  permission: Permission;
}