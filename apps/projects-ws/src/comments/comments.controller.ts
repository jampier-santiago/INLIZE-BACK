// Packages
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { CommentsService } from './comments.service';

// DTO's
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern({ cmd: 'create_comment' })
  create(@Payload() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @MessagePattern({ cmd: 'find_all_comments' })
  findAll(@Payload('id') id: number) {
    return this.commentsService.findAll(id);
  }

  @MessagePattern({ cmd: 'update_comment' })
  update(@Payload() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto.id, updateCommentDto);
  }

  @MessagePattern({ cmd: 'remove_comment' })
  remove(@Payload('id') id: number) {
    return this.commentsService.remove(id);
  }
}
