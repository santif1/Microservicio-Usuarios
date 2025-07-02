import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

// hacer     " npm install class-validator class-transformer "    si no reconoce 'class-validator'

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}