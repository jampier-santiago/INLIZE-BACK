// Packages
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
