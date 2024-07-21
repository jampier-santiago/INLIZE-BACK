// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { NotificationsController } from './notifications.controller';

// Config
import { NOTIFICATIONS_SERVICES } from '../config/services';

@Module({
  controllers: [NotificationsController],
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATIONS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class NotificationsModule {}
