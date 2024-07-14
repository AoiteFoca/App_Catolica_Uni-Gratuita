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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { DocsService } from './docs.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('docs')
export class DocsController {
  constructor(private readonly docs: DocsService) {}
  private readonly log = new Logger(DocsService.name);

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20,{
      storage: memoryStorage(), // Usando armazenamento em memória
    }),
  )
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: any,
    @Res() res: Response
  ): Promise<any> {
    try {
      const filesReceived = [];
      console.log(files)
      for(const file of files){
        const result = await this.docs.saveFile(file,data);
        filesReceived.push(result);
      }
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Arquivo salvo com sucesso!',
        data: filesReceived,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Erro ao salvar arquivos!`,
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
      console.log("docs")
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
