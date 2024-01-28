import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { messagesTranslator } from './localized-errors/localized-errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        console.log(errors);

        const result = errors.map((error) => ({
          property: error.property,
          message: messagesTranslator(
            error.constraints[Object.keys(error.constraints)[0]],
          ),
        }));
        return new BadRequestException(result);
      },
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173', 'http://0.0.0.0:5173'],
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
