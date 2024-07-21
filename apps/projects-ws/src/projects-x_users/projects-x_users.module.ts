// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { ProjectsXUsersService } from './projects-x_users.service';

// Controllers
import { ProjectsXUsersController } from './projects-x_users.controller';

// Entities
import { ProjectsXUser } from './entities/projects-x_user.entity';

// Modules
import { UsersModule } from 'apps/users-ws/src/users/users.module';
import { ProjectsModule } from 'apps/projects-ws/src/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsXUser]),
    UsersModule,
    ProjectsModule,
  ],
  controllers: [ProjectsXUsersController],
  providers: [ProjectsXUsersService],
})
export class ProjectsXUsersModule {}
