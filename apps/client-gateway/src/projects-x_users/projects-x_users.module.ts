// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { ProjectsXUsersController } from './projects-x_users.controller';

// Confid
import { PROJECTS_X_USERS_SERVICES } from '../config/services';

@Module({
  controllers: [ProjectsXUsersController],
  imports: [
    ClientsModule.register([
      {
        name: PROJECTS_X_USERS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class ProjectsXUsersModule {}
