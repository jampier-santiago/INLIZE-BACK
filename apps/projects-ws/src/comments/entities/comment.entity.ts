// Packages
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entities
import { User } from 'apps/users-ws/src/users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'comment', type: 'varchar', length: 255, nullable: false })
  comment: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'creator_user_id' })
  user: User;

  @ManyToOne(() => Task, (task) => task.id)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
