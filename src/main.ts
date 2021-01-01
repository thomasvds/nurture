import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(morgan('combined'));

  app.enableCors();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
    }),
  );

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
