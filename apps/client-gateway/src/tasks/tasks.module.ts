// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { TasksController } from './tasks.controller';

// Configs
import { TASKS_SERVICES } from '../config/services';

@Module({
  controllers: [TasksController],
  imports: [
    ClientsModule.register([
      {
        name: TASKS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class TasksModule {}
