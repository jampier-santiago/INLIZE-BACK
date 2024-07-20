import { Test, TestingModule } from '@nestjs/testing';
import { UsersWsController } from './users-ws.controller';
import { UsersWsService } from './users-ws.service';

describe('UsersWsController', () => {
  let usersWsController: UsersWsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersWsController],
      providers: [UsersWsService],
    }).compile();

    usersWsController = app.get<UsersWsController>(UsersWsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(usersWsController.getHello()).toBe('Hello World!');
    });
  });
});
