import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { LoginData } from './dtos/login-data-dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor (private readonly userS: UsersService) {}

    async login({ login, password}: LoginData): Promise<any> {
        try{
            const user = await this.userS.findByLogin(login);
            
            //Check if return user
            if(!user){
                throw new Error("Usuário não encontrado!");
            }else{
                //Check if password matches with the hashed one (stored in database)
                const passwordMatches = await compare(password, user.password);
                 
                if(!passwordMatches) {
                    throw new HttpException('Credenciais Inválidas', HttpStatus.UNAUTHORIZED);
                }

                delete user.password;
                return user;
            } 
        }catch(erro){
            throw new UnauthorizedException('Usuário não encontrado');
        }
    }
}