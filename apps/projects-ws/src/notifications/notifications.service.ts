// Packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO's
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

// Entities
import { Notification } from './entities/notification.entity';
import { User } from 'apps/users-ws/src/users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new notification.
   *
   * @param createNotificationDto - The data for creating the notification.
   * @returns The created notification.
   * @throws Error if the user is not found.
   */
  async create(createNotificationDto: CreateNotificationDto) {
    const { show, text, user } = createNotificationDto;

    try {
      const dataUser = await this.userRepository.findOneBy({
        id: user,
      });

      if (!dataUser) {
        throw new NotFoundException('User not found');
      }

      const notification = this.notificationRepository.create({
        show,
        text,
        user: dataUser,
      });

      await this.notificationRepository.save(notification);

      delete notification.createdAt;
      delete notification.updatedAt;
      delete notification.deletedAt;

      delete notification.user.createdAt;
      delete notification.user.updatedAt;
      delete notification.user.deletedAt;
      delete notification.user.password;

      return { data: notification };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Retrieves all notifications for a given user.
   *
   * @param userId - The ID of the user.
   * @returns An object containing the data of the notifications.
   */
  async findAll(userId: number) {
    try {
      const notifications = await this.notificationRepository.find({
        where: { user: { id: userId } },
      });

      return {
        data: notifications.map(({ id, show, text }) => ({ id, show, text })),
      };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Updates a notification with the specified ID.
   * @param id - The ID of the notification to update.
   * @param updateNotificationDto - The data to update the notification with.
   * @returns A Promise that resolves to the updated notification.
   * @throws NotFoundException if the notification or user is not found.
   */
  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const { show, text, user } = updateNotificationDto;

    try {
      const notification = await this.notificationRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!notification) {
        throw new NotFoundException('Notification not found');
      }

      let dataUser: User;

      if (user) {
        dataUser = await this.userRepository.findOne({
          where: { id: user },
        });

        if (!dataUser) {
          throw new NotFoundException('User not found');
        }
      }

      notification.show = show ?? notification.show;
      notification.text = text ?? notification.text;
      notification.user = dataUser ?? notification.user;

      await this.notificationRepository.update(id, notification);

      delete notification.createdAt;
      delete notification.updatedAt;
      delete notification.deletedAt;

      delete notification.user.createdAt;
      delete notification.user.updatedAt;
      delete notification.user.deletedAt;
      delete notification.user.password;

      return { data: notification };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
