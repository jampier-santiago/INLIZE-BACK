// Packages
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
