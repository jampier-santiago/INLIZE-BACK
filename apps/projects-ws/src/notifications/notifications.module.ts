// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { NotificationsService } from './notifications.service';

// Controllers
import { NotificationsController } from './notifications.controller';

// Entities
import { Notification } from './entities/notification.entity';

// Modules
import { UsersModule } from 'apps/users-ws/src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UsersModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [TypeOrmModule],
})
export class NotificationsModule {}
