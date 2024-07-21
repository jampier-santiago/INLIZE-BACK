// Packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO's
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

// Entities
import { Comment } from './entities/comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from 'apps/users-ws/src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new comment.
   * @param createCommentDto - The data required to create a comment.
   * @returns A Promise that resolves to the created comment.
   */
  async create(createCommentDto: CreateCommentDto) {
    const { comment, taskId, userId } = createCommentDto;

    try {
      const task = await this._validatedTask(taskId);
      const user = await this._validatedUser(userId);

      const newComment = this.commentRepository.create({
        comment,
        task,
        user,
      });

      await this.commentRepository.save(newComment);

      return { data: this._clearData(newComment) };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Validates and retrieves a task by its ID.
   * @param taskId - The ID of the task to validate and retrieve.
   * @returns A Promise that resolves to the validated task.
   * @throws Error if the task is not found.
   */
  private async _validatedTask(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['project'],
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  /**
   * Validates and retrieves a user by their ID.
   * @param userId - The ID of the user to validate and retrieve.
   * @returns A Promise that resolves to the validated user.
   * @throws Error if the user is not found.
   */
  private async _validatedUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Clears unnecessary data from a Comment object.
   * @param data - The Comment object to be cleared.
   * @returns A new object with the unnecessary data removed.
   */
  private _clearData(data: Comment) {
    const newData: any = { ...data };

    delete newData.deletedAt;
    delete newData.updatedAt;

    newData.user = { id: newData.user.id, name: newData.user.name };
    newData.task = { id: newData.task.id, name: newData.task.title };

    return newData;
  }

  /**
   * Retrieves all comments for a given task.
   *
   * @param taskId - The ID of the task.
   * @returns A Promise that resolves to an object containing the comments data.
   * @throws NotFoundException if the task is not found.
   */
  async findAll(taskId: number) {
    try {
      const task = await this._validatedTask(taskId);

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      const comments = await this.commentRepository.find({
        where: { task: { id: taskId } },
        relations: ['user', 'task'],
      });

      return { data: comments.map((comment) => this._clearData(comment)) };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Updates a comment with the specified ID.
   * @param id - The ID of the comment to update.
   * @param updateCommentDto - The data to update the comment with.
   * @returns A Promise that resolves to an object containing the updated comment data.
   * @throws Error if the comment with the specified ID is not found.
   */
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { comment } = updateCommentDto;
    try {
      const dataComment = await this.commentRepository.findOne({
        where: { id },
        relations: ['user', 'task'],
      });

      if (!dataComment) {
        throw new Error('Comment not found');
      }

      dataComment.comment = comment;

      await this.commentRepository.update(id, dataComment);

      return { data: this._clearData(dataComment) };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Removes a comment by its ID.
   * @param id - The ID of the comment to be removed.
   * @returns A promise that resolves to an object with a message indicating the success of the removal.
   * @throws An error if the comment is not found.
   */
  async remove(id: number) {
    try {
      const comment = await this.commentRepository.findOneBy({ id });

      if (!comment) {
        throw new Error('Comment not found');
      }

      await this.commentRepository.softRemove(comment);

      return { message: 'Comment removed successfully' };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
