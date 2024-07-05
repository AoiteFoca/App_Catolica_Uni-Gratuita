import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocsModule } from './documents/docs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, DocsModule, PrismaModule],
})

export class AppModule {}