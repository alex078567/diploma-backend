import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { NotesModule } from './notes/notes.module';

import config from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    UsersModule,
    CategoriesModule,
    NotesModule,
  ],
})
export class AppModule {}
