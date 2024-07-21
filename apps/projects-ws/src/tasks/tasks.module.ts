// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { TasksService } from './tasks.service';

// Controllers
import { TasksController } from './tasks.controller';

// Entities
import { Task } from './entities/task.entity';

// Modules
import { ProjectsModule } from '../projects/projects.module';
import { StatusTasksModule } from '../status-tasks/status-tasks.module';
import { UsersModule } from 'apps/users-ws/src/users/users.module';
import { TeamsModule } from 'apps/users-ws/src/teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ProjectsModule,
    StatusTasksModule,
    UsersModule,
    TeamsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule],
})
export class TasksModule {}
