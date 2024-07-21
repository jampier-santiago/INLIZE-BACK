// Packages
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// DTO's
import { CreateTaskDto } from 'apps/projects-ws/src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'apps/projects-ws/src/tasks/dto/update-task.dto';

// Config
import { TASKS_SERVICES } from '../config/services';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICES) private readonly tasksClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksClient.send({ cmd: 'create_task' }, createTaskDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('project/:id')
  findAll(@Param('id') id: string) {
    return this.tasksClient.send({ cmd: 'find_all_tasks' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksClient.send({ cmd: 'find_one_task' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksClient
      .send({ cmd: 'update_task' }, { id, ...updateTaskDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksClient.send({ cmd: 'remove_task' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
