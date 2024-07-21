// Packages
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Modules
import { RolesModule } from './roles/roles.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsXUsersModule } from './projects-x_users/projects-x_users.module';
import { StatusTasksModule } from './status-tasks/status-tasks.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';

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
    RolesModule,
    TeamsModule,
    UsersModule,
    ProjectsModule,
    ProjectsXUsersModule,
    StatusTasksModule,
    TasksModule,
    CommentsModule,
    NotificationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
