import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { unlink, readdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class DocsService {
    constructor(private readonly prisma: PrismaService) {}
    private readonly log = new Logger(UsersService.name);

    async saveFile(file: Express.Multer.File, data: any): Promise<any> {
        try{
            //#region Variables/Utils
            //Creates the file path and name
            const dirPath = join(`src/documents/files/pessoa${data.personId}/${data.category}/`);
            const fileName = await this.changeFileName(data.personId, data.category, file.originalname, dirPath);
            const filePath = join(dirPath, fileName);
            
            //Verifies if the person already sent data to the database earlier
            const sentDoc = await this.prisma.documentos.findFirst({where: {pessoaId: parseInt(data.personId)}});
            
            //Checks if file is bigger than 5MB
            if(file.size > (5242880)){
                throw ('O arquivo é maior que 5MB!');
            }
            
            //Dinamically creates the object to update the database
            const dataToUpdate = {}
            dataToUpdate[data.category] = dirPath;
            
            //Dinamically creates the object to create the database
            const dataToCreate = {
                pessoaId: parseInt(data.personId)
            }
            dataToCreate[data.category] = dirPath;
            console.log(dataToCreate)
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
                    where: {pessoaId: parseInt(data.personId)},
                    data: dataToUpdate
                })
            }else{
                await this.prisma.documentos.create({
                    data: dataToCreate
                })
            }
        }catch(error){
            this.log.log(`Erro ao salvar arquivo "${error}"!`);
            throw new Error(error);
        }
    }

    async deleteFile(data: any): Promise<any>{
        const dirPath = join(`src/documents/files/pessoa${data.personId}/${data.category}/`);
        const fileName = `pessoa${data.personId}-${data.category}-${data.sequence}`;

        const files = await readdir(dirPath);
        for(const file of files){
            if(file.includes(fileName)){
                await unlink(join(dirPath, file));
            }
        }

        const updatedFiles = await readdir(dirPath);
        if(updatedFiles.length == 0){
            await this.prisma.documentos.update({
                where: {pessoaId: parseInt(data.personId)},
                data: {
                    [data.category]: null
                }
            })
        }

        return files
    }
    
    //#region Extra Functions
    async changeFileName(personId, category, filename, dirPath){
        let updateName = filename;
        let sequence = 0;
    
        //Ajusts the filename to have a lenbth of 25 characters
        if(updateName.length > 25){
            const fileExtension = updateName.substring(updateName.lastIndexOf('.'));
            const maxNameLength = 25 - fileExtension.length;
    
            updateName = updateName.substring(0, maxNameLength) + fileExtension;
        }
        
        const files = await readdir(dirPath); 
        for(const name in files){
            if(files[name].includes(`pessoa${personId}-${category}-${sequence}`)){
                sequence++;
            }
        }
    
        updateName = `pessoa${personId}-${category}-${sequence}-${updateName.replace(/\s/g, '')}`;
        return updateName
    }
    //#endregion
}
