import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocsModule } from './documents/docs.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, DocsModule, PrismaModule],
  providers: [{provide: APP_GUARD, useClass: JwtAuthGuard}],
})

export class AppModule {}