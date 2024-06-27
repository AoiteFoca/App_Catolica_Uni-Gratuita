import { Usuario } from '@prisma/client';

export type UserNoPass = Omit<Usuario, 'password'>;