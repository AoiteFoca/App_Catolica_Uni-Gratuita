import {
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as redis from 'redis';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

const redisClient = redis.createClient();

@Injectable()
export class AuthService {
  constructor(private readonly userS: UsersService, private readonly jwtService: JwtService) {}

  
  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      login: user.login,
    };

    const jwtToken = await this.jwtService.sign(payload);
    this.cacheUserData(user, jwtToken);
    const userCache = await this.getUserDataFromCache(user.id);

    return{
      acces_token: userCache,
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

  //Storage user data in cache
  async cacheUserData(user: User, token: any){
    if(!redisClient.isOpen){
      await redisClient.connect();
    }

    const userData = {
      id: user.id,
      login: user.login,
      personId: user.personId,
      token: token,
    }

    await redisClient.set(`user:${user.id}`, JSON.stringify(userData), { EX: 60 * 60 });
  }

  //Retrieve user data from cache
  async getUserDataFromCache(userId: Number){
    if(!redisClient.isOpen){
      try{
        await redisClient.connect();
      }catch(error){
        console.error("Erro ao conectar ao Redis:", error);
        throw new Error("Falha na conexão com o Redis.");
      }
    }

    const userData = await redisClient.get(`user:${userId}`);

    return userData ? JSON.parse(userData) : null;
  }
}
