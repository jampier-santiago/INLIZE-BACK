import { Test, TestingModule } from '@nestjs/testing';
import { StatusTasksService } from './status-tasks.service';

describe('StatusTasksService', () => {
  let service: StatusTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusTasksService],
    }).compile();

    service = module.get<StatusTasksService>(StatusTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
