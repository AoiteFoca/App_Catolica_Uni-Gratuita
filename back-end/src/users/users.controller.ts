import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdatePasswordDto } from './dtos/update-pass-dto';
import { UserNoPass } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body() data: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userExists = await this.usersService.exists(data.login);
      if (userExists) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Login já existe!',
        });
      }

      const result = await this.usersService.createUser(data);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Usuário criado com sucesso!',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erro ao criar usuário',
        error: error.message,
      });
    }
  }

  @Get('exists/:login')
  async exists(@Param('login') login: string): Promise<boolean> {
    return this.usersService.exists(login);
  }

  @Get('findLogin')
  async findLogin(@Request() req: any) {
    return this.usersService.findLogin(req.users.login);
  }

  @Get('checkPassword/:senha')
  async testeSenha(@Param('senha') senha: string): Promise<any> {
    return this.usersService.checkPassword(senha);
  }

  @Patch('changePassword/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ): Promise<UserNoPass> {
    return this.usersService.changePassword(id, data);
  }

  @Patch('deactivate/:id')
  async deactivateUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deactivateUser(id);
  }
}
