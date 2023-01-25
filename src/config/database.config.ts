import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
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