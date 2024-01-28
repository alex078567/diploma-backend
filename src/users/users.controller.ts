import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async registerUser(@Body() data: RegisterDto) {
    const { password, password_confirm } = data;

    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }

    return await this.userService.createUser(data);
  }

  @Post('login')
  async loginUser(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = data;

    const user = await this.userService.getUserByEmail(email);

    // Сравнение паролей
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('password is incorrect');
    }

    // Генерация токена доступа
    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '10m' },
    );

    // Генерация токена обновления
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '7d' },
    );

    response.status(200);

    // Вместе с ответом передается куки, которая содержит
    // токен обновления
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      token: accessToken,
      name: user.name,
      id: user.id,
    };
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      // Получаем токен обновления
      const refreshToken = request.cookies['refresh_token'];
      // Если его удалось верифицировать, получаем id пользователя
      const { id } = await this.jwtService.verifyAsync(refreshToken);

      const accessToken = await this.jwtService.signAsync(
        {
          id,
        },
        { expiresIn: '10s' },
      );

      response.status(200);
      return {
        token: accessToken,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('getUserIdByToken')
  async getUserIdByToken(@Req() request: Request) {
    try {
      const refreshToken = request.cookies['refresh_token'];

      const { id } = await this.jwtService.verifyAsync(refreshToken);

      return {
        id,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<ReturnUserDto> {
    return await this.userService.getUserById(parseInt(id));
  }
}
