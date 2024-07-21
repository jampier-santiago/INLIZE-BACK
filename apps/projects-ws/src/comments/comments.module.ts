// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { CommentsService } from './comments.service';

// Controllers
import { CommentsController } from './comments.controller';

// Entities
import { Comment } from './entities/comment.entity';

// Modules
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from 'apps/users-ws/src/users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Comment]), TasksModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [TypeOrmModule],
})
export class CommentsModule {}
