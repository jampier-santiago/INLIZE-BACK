import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsWsController } from './projects-ws.controller';
import { ProjectsWsService } from './projects-ws.service';

describe('ProjectsWsController', () => {
  let projectsWsController: ProjectsWsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsWsController],
      providers: [ProjectsWsService],
    }).compile();

    projectsWsController = app.get<ProjectsWsController>(ProjectsWsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(projectsWsController.getHello()).toBe('Hello World!');
    });
  });
});
