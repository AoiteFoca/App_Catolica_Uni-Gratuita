import { IsNotEmpty, IsString, IsNumber, IsEmpty, IsOptional } from 'class-validator';

export class CreateDocsDto {
    @IsNotEmpty()
    @IsNumber()
    personId: number
}