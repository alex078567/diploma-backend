import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Category } from './category.entity';
import { Note } from './note.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;
  // Связь один ко многим
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
  // Связь один ко многим
  @OneToMany(() => Note, (note) => note.category)
  notes: Note[];

  // хеширование пароля перед тем, как сохранить его в базе данных
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
