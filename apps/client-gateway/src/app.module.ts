// Packages
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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

@Module({
  imports: [ConfigModule.forRoot(), RolesModule, TeamsModule, UsersModule, ProjectsModule, ProjectsXUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
