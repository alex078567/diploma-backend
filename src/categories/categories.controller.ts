import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/:userId')
  async getCategoriesByUserId(@Param('userId') userId: string) {
    const response = await this.categoriesService.getCategoriesByUserId(
      Number(userId),
    );
    return response;
  }

  @Post('/create')
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.categoriesService.createCategory(data);
  }

  @Patch('/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(
      Number(categoryId),
      data,
    );
  }

  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoriesService.deleteCategory(Number(categoryId));
  }
}
