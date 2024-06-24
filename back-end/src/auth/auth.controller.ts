import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('teste')
    teste() {
        return this.authService.teste();
    }
}