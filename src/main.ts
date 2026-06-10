import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/exceptions/global-exception.filter';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api/api.module';
import { cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDocs = SwaggerModule.createDocument(app,
    new DocumentBuilder()
      .setTitle('SaaS Api Docs')
      .setDescription('Your app description')
      .setVersion('1.0')
      .build(), {
    include: [ApiModule]
  })

  SwaggerModule.setup('/api', app, cleanupOpenApiDoc(apiDocs))

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.APP_PORT || '5000');
  console.clear();
  console.log('http://localhost:' + process.env.APP_PORT + '/api')
}
bootstrap();
