import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DocsService {
    constructor(private readonly prisma: PrismaService) {}
    private readonly log = new Logger(UsersService.name);

    async saveFile(file: Express.Multer.File, data: any): Promise<any> {
        try{
            const docs = this.prisma.documentos.create({
                data: {
                    pessoaId: 1,
                    inscricao: file.filename,
                }
            })
        }catch(error){
            this.log.log(`Arquivo "${file.filename}" não salvo!`);
            throw new Error('Não foi possível gravar o arquivo!');
        }
    
    }
}