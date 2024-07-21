import { Controller, Get } from '@nestjs/common';
import { ProjectsWsService } from './projects-ws.service';

@Controller()
export class ProjectsWsController {
  constructor(private readonly projectsWsService: ProjectsWsService) {}

  @Get()
  getHello(): string {
    return this.projectsWsService.getHello();
  }
}
