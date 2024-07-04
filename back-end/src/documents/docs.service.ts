import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DocsService {
    constructor(private readonly prisma: PrismaService) {}
    private readonly log = new Logger(UsersService.name);

    async saveFile(file: Express.Multer.File, data: any): Promise<any> {
        try{
            const dirPath = join(`src/documents/files/pessoa${data.pessoaId}/${data.categoria}/`);
            const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
            const filePath = join(dirPath, fileName);
            const sentDoc = await this.prisma.documentos.findFirst({where: {pessoaId: parseInt(data.pessoaId)}});

            //Verifies if the directory exists, if not, creates it
            if(!existsSync(dirPath)){
                mkdirSync(dirPath, {recursive: true});
            }

            //Function to save file in the server
            writeFileSync(filePath, file.buffer);
            
            //Verifies if the person already sent data to the database earlier
            if(sentDoc){
                const docs = await this.prisma.documentos.update({
                    where: {pessoaId: parseInt(data.pessoaId)},
                    data: {
                        inscricao: dirPath,
                    }
                })

                return {
                    filename: file.filename,
                    path: filePath,
                    doc: docs
                }
            }else{
                const docs = await this.prisma.documentos.create({
                    data: {
                        pessoaId: parseInt(data.pessoaId),
                        inscricao: dirPath,
                    }
                })

                return {
                    filename: file.filename,
                    path: filePath,
                    doc: docs
                }
            }
        }catch(error){
            this.log.log(`Arquivo "${file.originalname}" não salvo!`);
            throw new Error(error);
        }
    }
}