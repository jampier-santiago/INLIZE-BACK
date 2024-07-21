import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// Config
import { COMMENTS_SERVICES } from '../config/services';

// DTO's
import { CreateCommentDto } from 'apps/projects-ws/src/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'apps/projects-ws/src/comments/dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject(COMMENTS_SERVICES) private readonly commentsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsClient
      .send({ cmd: 'create_comment' }, createCommentDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.commentsClient.send({ cmd: 'find_all_comments' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsClient
      .send({ cmd: 'update_comment' }, { id, ...updateCommentDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsClient.send({ cmd: 'remove_comment' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
