import { Controller, Get, Param, Post, Body, Patch, Request } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UserNoPass } from './types';
import { UpdatePasswordDto } from './dtos/update-pass-dto';

@Controller("users")
export class UsersController {
    constructor(private prisma: UsersService) {}
    
    @Post("register")
    async createUser(@Body() data: CreateUserDto): Promise<any> {
        return this.prisma.createUser(data);
    }
    
    @Get("exists/:login")
    async exists(@Param('login') login: string): Promise<boolean> {
        return this.prisma.exists(login);
    }
    
    @Get("findLogin")
    async findLogin(@Request() req: any){
        return this.prisma.findLogin(req.users.login);
    }

    @Get("checkPassword/:senha")
    async testeSenha(@Param('senha') senha: string): Promise<Boolean> {
        return this.prisma.checkPassword(senha);
    }

    @Patch("changePassword/:id")
    async changePassword(@Param('id') id: any, @Body() data: UpdatePasswordDto): Promise<UserNoPass>{
        return this.prisma.changePassword(id, data);
    }

    @Patch("deactivate/:id")
    async deactivateUser(@Param('id') id: any): Promise<void> {
        return this.prisma.deactivateUser(id);
    }
}