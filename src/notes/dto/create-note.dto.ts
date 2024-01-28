import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;
  @IsString()
  color: string;
  @IsString()
  text: string;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
