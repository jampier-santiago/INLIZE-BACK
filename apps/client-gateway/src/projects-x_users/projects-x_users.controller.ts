// Packages
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { catchError } from 'rxjs';

// DTO'S
import { CreateProjectsXUserDto } from 'apps/projects-ws/src/projects-x_users/dto/create-projects-x_user.dto';

// Config
import { PROJECTS_X_USERS_SERVICES } from '../config/services';

// Utils
import { RolesGuard } from 'utils/guards/roles/roles.guard';

@Controller('projects-x-users')
export class ProjectsXUsersController {
  constructor(
    @Inject(PROJECTS_X_USERS_SERVICES)
    private readonly projectX_UsersClien: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  create(@Body() createProjectsXUserDto: CreateProjectsXUserDto) {
    return this.projectX_UsersClien
      .send({ cmd: 'create_projects_x_User' }, createProjectsXUserDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('/project/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  findUsers(@Param('id') id: string) {
    return this.projectX_UsersClien
      .send({ cmd: 'find_user_by_project' }, { id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard('jwt'))
  findProject(@Param('id') id: string) {
    return this.projectX_UsersClien
      .send({ cmd: 'find_project_by_user' }, { id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete('')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  remove(@Query('user') userId: string, @Query('project') projectId: number) {
    return this.projectX_UsersClien
      .send({ cmd: 'remove_projects_x_user' }, { userId, projectId })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
