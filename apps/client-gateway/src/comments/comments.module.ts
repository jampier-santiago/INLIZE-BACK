// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { CommentsController } from './comments.controller';

// Config
import { COMMENTS_SERVICES } from '../config/services';

@Module({
  controllers: [CommentsController],
  imports: [
    ClientsModule.register([
      {
        name: COMMENTS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class CommentsModule {}
