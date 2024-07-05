import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginData } from './dtos/login-data-dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userS: UsersService) {}
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
