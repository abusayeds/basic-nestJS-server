import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorHandler } from './common/errors/globalErrorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // Production এ log দেখার জন্য
  });

  // Global error handler
  app.useGlobalFilters(new GlobalErrorHandler());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS enable
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Explicitly mention
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Start server
  const port = process.env.PORT || 5000;
  await app.listen(port);

  console.log(`\n🚀 Server running on http://localhost:${port}/api/v1`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}\n`);
}

bootstrap();