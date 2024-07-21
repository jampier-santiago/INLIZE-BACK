import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsXUsersService } from './projects-x_users.service';

describe('ProjectsXUsersService', () => {
  let service: ProjectsXUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsXUsersService],
    }).compile();

    service = module.get<ProjectsXUsersService>(ProjectsXUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
