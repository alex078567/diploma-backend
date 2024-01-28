import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  @Column()
  text: string;
  // Связь многие к одному
  @ManyToOne(() => Category, (category) => category.notes, {
    // При удалении категории происходит удаление всех связанных с ней заметок
    onDelete: 'CASCADE' 
  })
  // Явное указание столбца, по которому происходит соединение
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  public categoryId: number;
  // Связь многие к одному
  @ManyToOne(() => User, (user) => user.notes)
  // Явное указание столбца, по которому происходит соединение
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  public userId: number;
}
