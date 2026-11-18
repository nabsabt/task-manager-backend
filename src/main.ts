import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import dns from 'node:dns/promises';
import { rateLimit } from 'express-rate-limit';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  dns.setServers(['1.1.1.1']);

  /**
   * default DDOS protection->
   */
  const limiter = rateLimit({
    windowMs: 60000,
    limit: 100,
  });

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
  });
  app.use(limiter);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(
    `Task Manager Backned is running on port ${process.env.PORT}, in ${process.env.PROD ? 'production' : 'test'} mode...`,
  );
}
await bootstrap();
