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
            //#region Variables/Utils
            //Creates the file path and name
            const date = new Date();
            const dirPath = join(`src/documents/files/pessoa${data.pessoaId}/${data.categoria}/`);
            const fileName = changeFileName(`pessoa${data.pessoaId}-${date.toLocaleDateString().replace(/\//g, '-')}-${file.originalname.replace(/\s/g, '')}`);
            const filePath = join(dirPath, fileName);
            
            //Verifies if the person already sent data to the database earlier
            const sentDoc = await this.prisma.documentos.findFirst({where: {pessoaId: parseInt(data.pessoaId)}});
            
            //Checks if file is bigger than 5MB
            if(file.size > (5242880)){
                throw ('O arquivo é maior que 5MB!');
            }
            
            //Dinamically creates the object to update the database
            const dataToUpdate = {}
            dataToUpdate[data.categoria] = filePath;
            
            //Dinamically creates the object to create the database
            const dataToCreate = {
                pessoaId: parseInt(data.pessoaId)
            }
            dataToCreate[data.categoria] = filePath;
            //#endregion

            //Verifies if the directory exists, if not, creates it
            if(!existsSync(dirPath)){
                mkdirSync(dirPath, {recursive: true});
            }

            //Function to save file in the server
            writeFileSync(filePath, file.buffer);
            
            //Verifies if the person already sent data to the database earlier
            if(sentDoc){
                await this.prisma.documentos.update({
                    where: {pessoaId: parseInt(data.pessoaId)},
                    data: dataToUpdate
                })
            }else{
                await this.prisma.documentos.create({
                    data: dataToCreate
                })
            }
        }catch(error){
            this.log.log(`Arquivo "${file.originalname}" não salvo!`);
            throw new Error(error);
        }
    }
}

function changeFileName(filename){
    if(filename.length > 50){
        const fileExtension = filename.substring(filename.lastIndexOf('.'));
        const maxNameLength = 50 - fileExtension.length;

        filename = filename.substring(0, maxNameLength) + fileExtension;
    }

    return filename
}