import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLoggerService } from './_infrastructure/logger/logger.service';
import { ClassSerializerInterceptor, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, 
    {
      logger: new CustomLoggerService()
    }
  )
  
  // app.useGlobalInterceptors(new CurrentUserInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true, 
    errorHttpStatusCode: 422,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        errors: Object.values(error.constraints),
      }));
      return new UnprocessableEntityException(formattedErrors);
    }
  
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
  .setTitle('THE SOCIAL BOT BACKEND API')
  .setDescription(
    'THIS IS THE ONE! THE SHIT AND NOT THE FART'
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: '.topbar { display: none !important; }',
  });

  await app.listen(3000).finally(() => {
    const logger = new CustomLoggerService()
    logger.debug('sheeeeeesh');
    logger.log('sheeeeeeesh');
    logger.warn('sheeeeeeesh');
    logger.error('sheeeeeeesh');
  });
}
bootstrap();
