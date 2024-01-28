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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/:userId')
  async getNotesByUserId(@Param('userId') userId: string) {
    const response = await this.notesService.getNotesByUserId(Number(userId));
    return response;
  }

  @Get('byCategory/:categoryId')
  async getNotesByCategoryId(@Param('categoryId') categoryId: string) {
    const response = await this.notesService.getNotesByCategoryId(
      Number(categoryId),
    );
    return response;
  }

  @Post('/create')
  async createNote(@Body() data: CreateNoteDto) {
    return await this.notesService.createNote(data);
  }

  @Patch('/:noteId')
  async updateNote(
    @Param('noteId') noteId: string,
    @Body() data: UpdateNoteDto,
  ) {
    return await this.notesService.updateNote(Number(noteId), data);
  }

  @Delete('/:noteId')
  async deleteNote(@Param('noteId') noteId: string) {
    return await this.notesService.deleteNote(Number(noteId));
  }
}
