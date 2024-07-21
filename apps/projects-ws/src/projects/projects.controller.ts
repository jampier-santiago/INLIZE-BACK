// Packages
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { ProjectsService } from './projects.service';

// DTO's
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({ cmd: 'create_project' })
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern({ cmd: 'find_all_projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_project' })
  findOne(@Payload('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_one_project' })
  update(@Payload() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(updateProjectDto.id, updateProjectDto);
  }

  @MessagePattern({ cmd: 'delete_project' })
  remove(@Payload('id') id: number) {
    return this.projectsService.remove(id);
  }
}
