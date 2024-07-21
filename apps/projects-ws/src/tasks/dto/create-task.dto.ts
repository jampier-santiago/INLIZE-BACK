// Packages
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  deadline: Date;

  @IsNotEmpty()
  @IsPositive()
  statusTaskId: number;

  @IsPositive()
  @IsOptional()
  userId: number;

  @IsPositive()
  @IsNotEmpty()
  teamId: number;

  @IsPositive()
  @IsNotEmpty()
  projectId: number;
}
