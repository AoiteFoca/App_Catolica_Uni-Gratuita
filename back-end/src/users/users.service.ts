import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdatePasswordDto } from './dtos/update-pass-dto';
import { UserNoPass } from './types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly log = new Logger(UsersService.name);

  async createUser(data: CreateUserDto): Promise<any> {
   //const hashedPassword = await hash(data.password, 10);
    data.password = await hash(data.password, 10);
    const user = await this.prisma.usuario.create({
      data: {
        login: data.login,
        password: data.password,
        userTypeId: data.userTypeId,
        personId: data.personId,
      },
    });
    delete user.password;
  }

  async exists(login: string): Promise<boolean> {
    const userLogin = await this.prisma.usuario.findFirst({
      where: { login: login },
    });

    if(userLogin == null){
      return false;      
    }else{
      return true;
    }
  }

  //Safe search for login
  async findLogin(log: string): Promise<UserNoPass> {
    const login = await this.findByLogin(log);

    delete login.password;
    return login;
  }

  //Internal search for login
  async findByLogin(login: string): Promise<Usuario> {
    const user = await this.prisma.usuario.findUnique({ where: { login } });

    return user;
  }

  async checkPassword(senha: string): Promise<Boolean> {
    const user = await this.prisma.usuario.findFirst({
      where: { id: 1 },
    });

    const users = await compare(senha, user.password);

    return users;
  }

  async changePassword(login: any, data: UpdatePasswordDto): Promise<UserNoPass> {
    //Catch user by id
    const user = await this.prisma.usuario.findFirst({
      where: { login: login },
    });

    //Check if user exists
    if (!user) {
      throw new Error('Usuário não encontrado!');
    } else {
      //Check old password
      const oldPasswordMatch = await compare(data.oldPassword, user.password);
      //const oldPasswordMatch = (a,b) => a === b

      if (!oldPasswordMatch) {
        throw new Error('Senha antiga incorreta!');
        //If the password is empty, it will throw an error
      } else if (!data.newPassword) {
        throw new Error('Digite uma senha válida!');
      } else {
        try {
          data.newPassword = await hash(data.newPassword, 10);
          const updateUser = await this.prisma.usuario.update({
            where: { login: login },
            data: { password: data.newPassword },
          });

          delete updateUser.password;
          return updateUser;
        } catch (error) {
          this.log.error(`Não foi possível atualizar a senha: ${error}`);
          throw new Error('Não foi possível atualizar a senha!');
        }
      }
    }
  }

  async deactivateUser(id: any): Promise<void> {
    await this.prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });
  }
}
