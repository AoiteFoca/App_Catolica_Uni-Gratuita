import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginData } from './dtos/login-data-dto';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(private readonly userS: UsersService, private readonly jwtService: JwtService) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      login: user.login,
    };
    const jwtToken = this.jwtService.sign(payload);
    return{
      acces_token: jwtToken,
    }
  }
  async validateUser(login: string, password: string) {
    const user = await this.userS.findByLogin(login);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Usuário ou senha inválidos!');
  }
}
