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
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// DTO's
import { CreateProjectDto } from 'apps/projects-ws/src/projects/dto/create-project.dto';
import { UpdateProjectDto } from 'apps/projects-ws/src/projects/dto/update-project.dto';

// Config
import { PROJECTS_SERVICES } from '../config/services';

// Utils
import { RolesGuard } from 'utils/guards/roles/roles.guard';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(PROJECTS_SERVICES) private readonly projectsClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  findAll() {
    return this.projectsClient.send({ cmd: 'find_all_projects' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.projectsClient.send({ cmd: 'find_one_project' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  remove(@Param('id') id: string) {
    return this.projectsClient.send({ cmd: 'delete_project' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
