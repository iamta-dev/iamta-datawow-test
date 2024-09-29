import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
  app.enableCors(corsOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DataWowTest API')
    .setDescription('DataWowTest Swagger Open API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const swaggerFilePath = join(__dirname, '../../public/swagger.json');
  writeFileSync(swaggerFilePath, JSON.stringify(document));

  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.get('/', (req, res) => {
    res.send('DataWowTest API is running!');
  });

  expressApp.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(document, {
      customJs: '/static/swagger-custom.js',
      customCssUrl: '/static/swagger-custom.css',
    }),
  );

  expressApp.use('/static', express.static(join(__dirname, '../../public')));

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/api-docs`);
  console.log('Allowed origins:', allowedOrigins);
}

bootstrap();
