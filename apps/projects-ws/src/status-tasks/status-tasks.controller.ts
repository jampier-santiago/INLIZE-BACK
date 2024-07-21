// Packages
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { StatusTasksService } from './status-tasks.service';

// DTO's
import { CreateStatusTaskDto } from './dto/create-status-task.dto';

@Controller()
export class StatusTasksController {
  constructor(private readonly statusTasksService: StatusTasksService) {}

  @MessagePattern({ cmd: 'create_status_task' })
  create(@Payload() createStatusTaskDto: CreateStatusTaskDto) {
    return this.statusTasksService.create(createStatusTaskDto);
  }

  @MessagePattern({ cmd: 'find_all_status_tasks' })
  findAll() {
    return this.statusTasksService.findAll();
  }
}
