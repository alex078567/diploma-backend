import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
