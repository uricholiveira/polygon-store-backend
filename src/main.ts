import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Polygon Store')
    .setDescription('The Polygon Store API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    methods: ['GET', 'OPTIONS', 'POST', 'PATCH', 'DELETE'],
    origin: '*',
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
