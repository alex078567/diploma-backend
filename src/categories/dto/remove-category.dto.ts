import { IsNumber} from 'class-validator';

export class DeleteCategoryDto {
  @IsNumber()
  id: number;
}
