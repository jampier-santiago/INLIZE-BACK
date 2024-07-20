// Packages
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

// Entities
import { Role } from '../../roles/entities/role.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 50, nullable: false, type: 'varchar' })
  name: string;

  @Column({
    name: 'email',
    length: 50,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({ name: 'password', length: 350, nullable: false, type: 'varchar' })
  password: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
