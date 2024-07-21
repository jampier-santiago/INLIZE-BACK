// Packages
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// Modules
import { ProjectsWsModule } from './projects-ws.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProjectsWsModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.PORT_PROJECTS_WS),
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
}
bootstrap();
