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
import { StatusTask } from '../../status-tasks/entities/status-task.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from 'apps/users-ws/src/users/entities/user.entity';
import { Team } from 'apps/users-ws/src/teams/entities/team.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ name: 'description', type: 'varchar', nullable: true, length: 500 })
  description: string;

  @Column({ name: 'deadline', type: 'date', nullable: false })
  deadline: Date;

  @ManyToOne(() => StatusTask, (statusTask) => statusTask.id)
  @JoinColumn({ name: 'status_task_id' })
  statusTask: StatusTask;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => Project, (project) => project.id)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
