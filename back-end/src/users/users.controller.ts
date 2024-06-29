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
  constructor(private prisma: UsersService) {}

  @Post('register')
  async createUser(
    @Body() data: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this.prisma.createUser(data);
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
    return this.prisma.exists(login);
  }

  @Get('findLogin')
  async findLogin(@Request() req: any) {
    return this.prisma.findLogin(req.users.login);
  }

  @Get('checkPassword/:senha')
  async testeSenha(@Param('senha') senha: string): Promise<Boolean> {
    return this.prisma.checkPassword(senha);
  }

  @Patch('changePassword/:id')
  async changePassword(
    @Param('id') id: any,
    @Body() data: UpdatePasswordDto,
  ): Promise<UserNoPass> {
    return this.prisma.changePassword(id, data);
  }

  @Patch('deactivate/:id')
  async deactivateUser(@Param('id') id: any): Promise<void> {
    return this.prisma.deactivateUser(id);
  }
}
