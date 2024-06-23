import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class AppService {
  async getGoodbye(): Promise<any> {
    const user = await prisma.estadoCivil.findMany()
    return user
  }
}