// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { RolesController } from './roles.controller';

// Config
import { ROLES_SERVICES } from '../config/services';

@Module({
  controllers: [RolesController],
  imports: [
    ClientsModule.register([
      {
        name: ROLES_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
})
export class RolesModule {}
