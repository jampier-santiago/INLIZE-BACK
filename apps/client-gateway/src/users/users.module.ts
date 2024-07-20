// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { UsersController } from './users.controller';

// Config
import { USERS_SERVICES } from '../config/services';

@Module({
  controllers: [UsersController],
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
})
export class UsersModule {}
