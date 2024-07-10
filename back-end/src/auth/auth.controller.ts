import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginData } from './dtos/login-data-dto';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest, @Res() res: Response): Promise<any>{
        try {
            const result = await this.authService.login(req.user);
            return res.status(HttpStatus.OK).json({
              success: true,
              message: 'Seja bem-vindo!',
              data: result,
            });
          } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
              success: false,
              message: 'Houve um erro ao fazer login!',
              error: error.message,
            });
          }
    }
}