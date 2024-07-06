import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { DocsService } from './docs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('docs')
export class DocsController {
  constructor(private readonly docs: DocsService) {}
  private readonly log = new Logger(DocsService.name);

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // Usando armazenamento em memória
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
        message: `Erro ao salvar arquivo "${file.originalname}"!`,
        error: error.message,
      });
    }
  }

  @Delete('delete')
  async deleteFile(
    @Body() data: any,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this.docs.deleteFile(data);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Arquivo deletado com sucesso!',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Erro ao deletar arquivo!`,
        error: error.message,
      });
    }
  }
}
