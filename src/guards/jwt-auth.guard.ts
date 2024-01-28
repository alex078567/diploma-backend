import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// Создаем класс, отвечающий за защиту пути от несанкционированного доступа
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
