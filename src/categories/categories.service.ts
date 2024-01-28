import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategoriesByUserId(userId: number) {
    const categories = await this.categoryRepository.find({
      where: { userId },
      order: { id: 'ASC' },
    });
    return {
      message: 'Ok',
      statusCode: 200,
      data: categories,
    };
  }

  async createCategory(data: CreateCategoryDto) {
    const { name, userId } = data;
    const category = this.categoryRepository.create({
      name,
      userId,
    });

    try {
      await this.categoryRepository.save(category);
      return {
        message: 'Категория успешно добавлена',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Категория уже существует');
      }

      throw error;
    }
  }

  async updateCategory(id: number, data: UpdateCategoryDto) {
    const { name } = data;

    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    Object.assign(category, { name });
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number) {
    try {
      await this.categoryRepository.delete(id);
      return {
        message: 'Категория успешно удалена',
        statusCode: 200,
      };
    } catch (error) {
      return error;
    }
  }
}
