// Packages
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsDate()
  @Type(() => Date)
  startDate: string;

  @IsDate()
  @Type(() => Date)
  endDate: string;
}
