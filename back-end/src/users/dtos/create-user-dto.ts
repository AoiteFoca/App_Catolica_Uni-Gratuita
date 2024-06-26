import { IsNotEmpty, IsString, IsNumber, IsEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsNumber()
    userTypeId: number

    @IsEmpty()
    @IsOptional()
    @IsNumber()
    personId: number
}