import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, 
    {
      logger: new CustomLoggerService()
    }
  )

  const config = new DocumentBuilder()
    .setTitle('THE SOCIAL BOT BACKEND API')
    .setDescription(
      'THIS IS THE ONE! THE SHIT AND NOT THE FART'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000).finally(() => {
    const logger = new CustomLoggerService()
    logger.debug('sheeeeeesh');
    logger.log('sheeeeeeesh');
    logger.warn('sheeeeeeesh');
    logger.error('sheeeeeeesh');
  });
}
bootstrap();
