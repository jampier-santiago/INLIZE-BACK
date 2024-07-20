import { NestFactory } from '@nestjs/core';
import { UsersWsModule } from './users-ws.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersWsModule);
  await app.listen(3000);
}
bootstrap();
