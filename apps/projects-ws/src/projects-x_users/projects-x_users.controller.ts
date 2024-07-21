// Packages
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { ProjectsXUsersService } from './projects-x_users.service';

// DTO's
import { CreateProjectsXUserDto } from './dto/create-projects-x_user.dto';

@Controller()
export class ProjectsXUsersController {
  constructor(private readonly projectsXUsersService: ProjectsXUsersService) {}

  @MessagePattern({ cmd: 'create_projects_x_User' })
  create(@Payload() createProjectsXUserDto: CreateProjectsXUserDto) {
    return this.projectsXUsersService.create(createProjectsXUserDto);
  }

  @MessagePattern({ cmd: 'find_user_by_project' })
  findUsers(@Payload('id') id: number) {
    return this.projectsXUsersService.findUsersByProject(id);
  }

  @MessagePattern({ cmd: 'find_project_by_user' })
  findProjects(@Payload('id') id: number) {
    return this.projectsXUsersService.findProjectsByUser(id);
  }

  @MessagePattern({ cmd: 'remove_projects_x_user' })
  remove(@Payload() data: { userId: number; projectId: number }) {
    return this.projectsXUsersService.remove(data);
  }
}
