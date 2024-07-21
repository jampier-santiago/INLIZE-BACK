// Packages
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { TasksService } from './tasks.service';

// DTO's
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({ cmd: 'create_task' })
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern({ cmd: 'find_all_tasks' })
  findAll(@Payload('id') id: number) {
    return this.tasksService.findAll(id);
  }

  @MessagePattern({ cmd: 'find_one_task' })
  findOne(@Payload('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_task' })
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern({ cmd: 'remove_task' })
  remove(@Payload('id') id: number) {
    return this.tasksService.remove(id);
  }
}
