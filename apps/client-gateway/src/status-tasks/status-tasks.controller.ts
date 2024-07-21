import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// DTO's
import { CreateStatusTaskDto } from 'apps/projects-ws/src/status-tasks/dto/create-status-task.dto';

// Config
import { STATUS_TASKS_SERVICES } from '../config/services';

@Controller('status-tasks')
export class StatusTasksController {
  constructor(
    @Inject(STATUS_TASKS_SERVICES)
    private readonly statusTasksClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createStatusTaskDto: CreateStatusTaskDto) {
    return this.statusTasksClient
      .send({ cmd: 'create_status_task' }, createStatusTaskDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  findAll() {
    return this.statusTasksClient
      .send({ cmd: 'find_all_status_tasks' }, {})
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
