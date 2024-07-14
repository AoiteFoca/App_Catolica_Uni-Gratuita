import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import  { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
