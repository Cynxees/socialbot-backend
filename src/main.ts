import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLoggerService } from './_infrastructure/logger/logger.service';
import { ClassSerializerInterceptor, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './_infrastructure/filter/http-exception.filter';

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
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
  .setTitle('Socialbot API Documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Socialbot API',
    customCss: `
    .topbar { display: none !important; }
    .swagger-ui .topbar-wrapper { background-color: #323232; }
    #download-sdk-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 10px 0;
      cursor: pointer;
      border-radius: 4px;
    }
    #download-sdk-button:hover {
      background-color: #45a049;
    }
    `,
    customJs: `
      window.onload = function() {
        var downloadButton = document.createElement('button');
        downloadButton.setAttribute('id', 'download-sdk-button');
        downloadButton.innerText = 'Download SDK';
        downloadButton.onclick = function() {
          window.location.href = '/sdk/download';
        };

        document.querySelector('.swagger-ui').appendChild(downloadButton);
      };
    `,
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
