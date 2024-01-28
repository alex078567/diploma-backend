import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async getNotesByUserId(userId: number) {
    const notes = await this.noteRepository.find({ where: { userId } });
    if (notes.length < 1) {
      throw new NotFoundException('Список заметок пуст');
    }
    return {
      message: 'Ok',
      statusCode: 200,
      data: notes,
    };
  }

  async getNotesByCategoryId(categoryId: number) {
    const notes = await this.noteRepository.find({
      where: { categoryId },
      order: { id: 'ASC' },
    });
    return {
      message: 'Ok',
      statusCode: 200,
      data: notes,
    };
  }

  async createNote(data: CreateNoteDto) {
    const note = this.noteRepository.create(data);
    try {
      await this.noteRepository.save(note);
      return {
        message: 'Заметка успешно добавлена',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Заметка уже существует');
      }

      throw error;
    }
  }

  async deleteNote(id: number) {
    try {
      await this.noteRepository.delete(id);
      return {
        message: 'Заметка успешно удалена',
        statusCode: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateNote(id: number, data: Partial<Note>) {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException('Заметка не найдена');
    }
    Object.assign(note, data);
    try {
      await this.noteRepository.save(note);
      return {
        message: 'Заметка успешно обновлена',
        statusCode: 201,
      };
    } catch (error) {
      throw error;
    }
  }
}
