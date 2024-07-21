// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { ProjectsWsController } from './projects-ws.controller';

// Services
import { ProjectsWsService } from './projects-ws.service';

// Modules
import { ProjectsModule } from './projects/projects.module';
import { ProjectsXUsersModule } from './projects-x_users/projects-x_users.module';
import { StatusTasksModule } from './status-tasks/status-tasks.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule,
    ProjectsXUsersModule,
    StatusTasksModule,
    TasksModule,
    CommentsModule,
    NotificationsModule,
  ],
  controllers: [ProjectsWsController],
  providers: [ProjectsWsService],
})
export class ProjectsWsModule {}
