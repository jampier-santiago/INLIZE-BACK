// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { StatusTasksController } from './status-tasks.controller';

// Config
import { STATUS_TASKS_SERVICES } from '../config/services';

@Module({
  controllers: [StatusTasksController],
  imports: [
    ClientsModule.register([
      {
        name: STATUS_TASKS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class StatusTasksModule {}
