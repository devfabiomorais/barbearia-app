import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera CORS para todas as origens (ou especifique a URL se quiser)
  app.enableCors({
    origin: '*', // ou coloque sua URL como: 'http://localhost:19006' para o Expo Web
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
