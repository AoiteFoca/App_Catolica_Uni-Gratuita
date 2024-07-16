import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//Implementing HTTPS
require('dotenv').config();

async function bootstrap() {
  /*const httpsOptions = {
    key: fs.readFileSync('./src/auth/secrets/private.key'),
    cert: fs.readFileSync('./src/auth/secrets/certificate.crt'),
  };*/
  const app = await NestFactory.create(AppModule, {
    /*httpsOptions,*/ snapshot: true, cors: true
  });
    // Pipes
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

  //Starts listening for shutdown hook
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
