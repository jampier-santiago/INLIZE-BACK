// Packages
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controllers
import { TeamsController } from './teams.controller';

// Config
import { TEAMS_SERVICES } from '../config/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TEAMS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [TeamsController],
})
export class TeamsModule {}
