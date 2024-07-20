// Packages
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Modules
import { RolesModule } from './roles/roles.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [ConfigModule.forRoot(), RolesModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
