// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

// Entities
import { User } from './entities/user.entity';

// Modules
import { RolesModule } from '../roles/roles.module';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, TeamsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
