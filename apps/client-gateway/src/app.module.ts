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

@Module({
  imports: [ConfigModule.forRoot(), RolesModule, TeamsModule, UsersModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
