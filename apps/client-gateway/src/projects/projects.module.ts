// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Packages
import { ProjectsController } from './projects.controller';

// Config
import { PROJECTS_SERVICES } from '../config/services';

@Module({
  controllers: [ProjectsController],
  imports: [
    ClientsModule.register([
      {
        name: PROJECTS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class ProjectsModule {}
