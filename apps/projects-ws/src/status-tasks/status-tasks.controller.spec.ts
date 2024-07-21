import { Test, TestingModule } from '@nestjs/testing';
import { StatusTasksController } from './status-tasks.controller';
import { StatusTasksService } from './status-tasks.service';

describe('StatusTasksController', () => {
  let controller: StatusTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusTasksController],
      providers: [StatusTasksService],
    }).compile();

    controller = module.get<StatusTasksController>(StatusTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
