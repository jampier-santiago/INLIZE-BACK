// Packages
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// DTO's
import { CreateNotificationDto } from 'apps/projects-ws/src/notifications/dto/create-notification.dto';
import { UpdateNotificationDto } from 'apps/projects-ws/src/notifications/dto/update-notification.dto';

// Config
import { NOTIFICATIONS_SERVICES } from '../config/services';

@Controller('notifications')
export class NotificationsController {
  constructor(
    @Inject(NOTIFICATIONS_SERVICES)
    private readonly notificactionClients: ClientProxy,
  ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificactionClients
      .send({ cmd: 'create_notification' }, createNotificationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.notificactionClients
      .send({ cmd: 'find_all_notifications' }, { id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificactionClients
      .send({ cmd: 'update_notification' }, { id, ...updateNotificationDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
