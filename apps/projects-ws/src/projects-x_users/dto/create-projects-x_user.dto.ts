// Packages
import { IsNumber, IsPositive } from 'class-validator';

export class CreateProjectsXUserDto {
  @IsNumber()
  @IsPositive()
  projectId: number;

  @IsNumber()
  @IsPositive()
  userId: number;
}
