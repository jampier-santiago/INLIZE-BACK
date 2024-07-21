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

// DTO's
import { CreateProjectDto } from 'apps/projects-ws/src/projects/dto/create-project.dto';
import { UpdateProjectDto } from 'apps/projects-ws/src/projects/dto/update-project.dto';

// Config
import { PROJECTS_SERVICES } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(PROJECTS_SERVICES) private readonly projectsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsClient
      .send({ cmd: 'create_project' }, createProjectDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  findAll() {
    return this.projectsClient.send({ cmd: 'find_all_projects' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsClient.send({ cmd: 'find_one_project' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsClient
      .send({ cmd: 'update_one_project' }, { id, ...updateProjectDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsClient.send({ cmd: 'delete_project' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
