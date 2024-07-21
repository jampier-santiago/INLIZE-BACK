// Packages
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  show: boolean;

  @IsNotEmpty()
  @IsNumber()
  user: number;
}
