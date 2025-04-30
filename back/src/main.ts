import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import { BadRequestInterceptor } from './common/errors/interceptors/badrequest.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/notFound.interceptor';
import { InternalServerErrorInterceptor } from './common/errors/interceptors/internalservererror.interceptor';
import {
  ForbiddenExceptionFilter,
  ForbiddenInterceptor,
} from './common/errors/interceptors/forbidden.interceptor';

declare global {
  interface Uint8Array {
    toBase64(): string;
  }

  interface String {
    toBase64(): null;
  }
}

Uint8Array.prototype.toBase64 = function () {
  return Buffer.from(this).toString('base64');
};

String.prototype.toBase64 = function () {
  return null;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Libera CORS para todas as origens (ou especifique a URL se quiser)
  app.enableCors({
    origin: '*', // ou coloque sua URL como: 'http://localhost:19006' para o Expo Web
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  app.useGlobalFilters(new ForbiddenExceptionFilter());
  app.useGlobalInterceptors(new ForbiddenInterceptor());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new BadRequestInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new InternalServerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Praise Plus')
    .setDescription('API Praise Plus')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
