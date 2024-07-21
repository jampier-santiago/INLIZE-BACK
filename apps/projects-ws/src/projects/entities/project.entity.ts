// Packages
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    length: 50,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  title: string;

  @Column({
    name: 'description',
    length: 250,
    nullable: false,
    type: 'varchar',
  })
  description: string;

  @Column({ name: 'is_active', nullable: false, type: 'boolean' })
  isActive: boolean;

  @Column({ name: 'start_date', nullable: false, type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', nullable: false, type: 'date' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
