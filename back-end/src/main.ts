import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//Implementing HTTPS
import * as fs from 'fs';
import * as https from 'https';
//require('dotenv').config();

async function bootstrap() {
  /*const httpsOptions = {
    key: fs.readFileSync('./src/auth/secrets/private.key'),
    cert: fs.readFileSync('./src/auth/secrets/certificate.crt'),
  };*/
  const app = await NestFactory.create(AppModule, {
    /*httpsOptions,*/ snapshot: true
  });
  //Starts listening for shutdown hook
  app.enableShutdownHooks();
  
  await app.listen(3000);
}
bootstrap();
