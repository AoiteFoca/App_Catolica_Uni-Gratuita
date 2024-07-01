import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class DocsService {
}