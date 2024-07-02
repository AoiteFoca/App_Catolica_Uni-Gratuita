import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { DocsService } from './docs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('docs')
export class DocsController {
  constructor(private docs: DocsService) {}
  private readonly log = new Logger(DocsService.name);

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/documents/files/',
        filename: (req, file, save) => {
          const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
          save(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this.docs.saveFile(file,data);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Arquivo salvo com sucesso!',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erro ao salvar arquivo!',
        error: error.message,
      });
    }
  }
}
