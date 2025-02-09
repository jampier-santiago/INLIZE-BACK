import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsXUsersController } from './projects-x_users.controller';

describe('ProjectsXUsersController', () => {
  let controller: ProjectsXUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsXUsersController],
    }).compile();

    controller = module.get<ProjectsXUsersController>(ProjectsXUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
