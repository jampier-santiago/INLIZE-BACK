// Packages
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusTaskDto {
  @IsNotEmpty()
  @IsString()
  value: string;
}
