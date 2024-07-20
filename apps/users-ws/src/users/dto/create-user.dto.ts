// Packages
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  role: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  team: number;
}
