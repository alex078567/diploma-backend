import { Exclude, Expose } from 'class-transformer';
export class ReturnUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Exclude()
  password: string;
}
