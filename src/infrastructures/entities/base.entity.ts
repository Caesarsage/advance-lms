import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityStatus } from '../enums/statatus.enum';

export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 20, default: 'PENDING' })
  status: EntityStatus;

  @Column()
  created_by: string;

  @CreateDateColumn({ type: 'datetime' })
  created_on: Date;

  @Column()
  last_modified_by: string;

  @UpdateDateColumn({ type: 'datetime' })
  last_modified_on: Date;
}
