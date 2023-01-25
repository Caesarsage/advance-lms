import { OAuthTutor } from 'src/modules/oauth-tutors/entities/oauth-tutor.entity';
import 'dotenv/config';

import { Permission } from 'src/modules/roles/entities/permission.entity';
import { RolePermission } from 'src/modules/roles/entities/role-permission.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Sector } from 'src/modules/sector/entities/sector.entity';
import { Student } from 'src/modules/students/entities/student.entity';
import { User } from 'src/modules/users/entities/user.emtity';
import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [
  //   User, Sector, Role, RolePermission, Permission, OAuthTutor, Student
  // ],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsTableName: 'database_migrations_log',
  migrationsRun: true,
  synchronize: false
}