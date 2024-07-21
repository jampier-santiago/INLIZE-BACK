import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsWsService {
  getHello(): string {
    return 'Hello World!';
  }
}
