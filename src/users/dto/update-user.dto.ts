import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  surname: string;
}
