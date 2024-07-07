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
  async exists(
    @Param('login') login: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this.usersService.exists(login);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Usuário já cadastrado!',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erro ao verificar usuário',
        error: error.message,
      });
    }
  }

  @Get('findLogin')
  async findLogin(@Request() req: any, @Res() res: Response): Promise<any> {
    try {
      const result = await this.usersService.findLogin(req.users.login);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Login encontrado com sucesso!',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erro ao encontrar login',
        error: error.message,
      });
    }
  }

  @Get('checkPassword/:senha')
  async testeSenha(
    @Param('senha') senha: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this.usersService.checkPassword(senha);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Usuário autenticado com sucesso!',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erro ao verificar senha',
        error: error.message,
      });
    }
  }

  @Patch('changePassword/:login')
  async changePassword(
    @Param('login') login: any,
    @Body() data: UpdatePasswordDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this.usersService.changePassword(login, data);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Senha alterada com sucesso!',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erro ao alterar senha',
        error: error.message,
      });
    }
  }

  @Patch('deactivate/:id')
  async deactivateUser(
    @Param('id') id: any,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.usersService.deactivateUser(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Usuário desativado com sucesso!',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erro ao desativar usuário',
        error: error.message,
      });
    }
  }
}
