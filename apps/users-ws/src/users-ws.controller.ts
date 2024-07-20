import { Controller, Get } from '@nestjs/common';
import { UsersWsService } from './users-ws.service';

@Controller()
export class UsersWsController {
  constructor(private readonly usersWsService: UsersWsService) {}

  @Get()
  getHello(): string {
    return this.usersWsService.getHello();
  }
}
