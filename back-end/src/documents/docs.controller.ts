import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Request,
    Res,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { Express, Response } from 'express';
import { DocsService } from './docs.service';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';

  
  @Controller('docs')
  export class DocsController {
    constructor(private prisma: UsersService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
  }