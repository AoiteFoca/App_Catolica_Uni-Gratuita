import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [DocsController],
  providers: [DocsService, UsersService],
})

export class DocsModule {}