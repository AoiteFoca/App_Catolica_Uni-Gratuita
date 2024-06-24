import { IsNotEmpty, IsEmail, IsString, IsNumber, IsEmpty } from 'class-validator';

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
    @IsNumber()
    personId: number
}