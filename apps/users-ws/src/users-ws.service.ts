import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersWsService {
  getHello(): string {
    return 'Hello World!';
  }
}
