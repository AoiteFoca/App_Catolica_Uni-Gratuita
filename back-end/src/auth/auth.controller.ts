import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginData } from './dtos/login-data-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() LoginData: LoginData){
        const loginResponse = await this.authService.login(LoginData);
        return loginResponse;
    }
}