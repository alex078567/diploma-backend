import { IsNumber } from 'class-validator';

export class GetCategoriesDto {
  @IsNumber()
  userId: number;
}
