// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { StatusTasksService } from './status-tasks.service';

// Controllers
import { StatusTasksController } from './status-tasks.controller';

// Entitites
import { StatusTask } from './entities/status-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusTask])],
  controllers: [StatusTasksController],
  providers: [StatusTasksService],
  exports: [TypeOrmModule],
})
export class StatusTasksModule {}
