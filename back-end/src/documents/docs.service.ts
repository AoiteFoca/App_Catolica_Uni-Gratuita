import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DocsService {
    constructor(private readonly prisma: PrismaService) {}
    private readonly log = new Logger(UsersService.name);

    async saveFile(file: Express.Multer.File, data: any): Promise<any> {
        try{
            const filePath = join('src/documents/files/', `${Date.now()}-${file.originalname.replace(/\s/g, '')}`);
            
            //Function to save file in the server
            writeFileSync(filePath, file.buffer);
        
            const docs = await this.prisma.documentos.create({
                data: {
                    pessoaId: 1,
                    inscricao: file.originalname,
                    numPesGrupoFamiliar: file.originalname,
                    situacaoCivil: file.originalname,
                    rendaFamiliar: file.originalname,
                    impostoDeRenda: file.originalname,
                    bensFamiliares: file.originalname,
                    tipoMoradia: file.originalname,
                    despesasMoradia: file.originalname,
                    residenciaSC: file.originalname,
                    ensinoMedio: file.originalname,
                    despesaTransporte: file.originalname,
                    despesaDoenca: file.originalname,
                    deficiencia: file.originalname,
                    despesaEducacao: file.originalname,
                    adesaoUniGratuita: file.originalname,
                }
            })
            return {
                filename: file.filename,
                path: filePath,
                doc: docs
            }
        }catch(error){
            this.log.log(`Arquivo "${file.originalname}" não salvo!`);
            throw new Error(error);
        }
    }
}