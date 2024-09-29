import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('Allowed origins:', allowedOrigins);
}
bootstrap();
