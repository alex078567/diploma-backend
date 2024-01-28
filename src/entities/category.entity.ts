import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Note } from './note.entity';

@Entity()
// Для каждого пользователя категории должны быть уникальными
@Unique(['name', 'userId'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  // Связь многие к одному
  @ManyToOne(() => User, (user) => user.categories)
  // Явное указание столбца, по которому происходит соединение
  @JoinColumn({ name: 'userId' })
  user: User;
  
  @Column()
  public userId: number;
  
  // Связь один ко многим
  @OneToMany(() => Note, (note: Note) => note.category, {
    // каскадное изменение данных
    cascade: true,
  })
  notes: Note[];
}
