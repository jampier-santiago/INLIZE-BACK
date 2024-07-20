// Packages
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from './app.module';

// Filters
import { ExceptionFilter } from './common/exceptions/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(process.env.PORT_GATEWAY);
}
bootstrap();
