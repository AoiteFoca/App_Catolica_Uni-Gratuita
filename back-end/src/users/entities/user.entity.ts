export class User {
    id: number;
    login: string;
    password: string;
    userTypeId: number;
    personId?: number;
    active: boolean;
  }

  /*
  id         Int     @id @default(autoincrement())
  login      String  @unique @map("Login")
  password   String  @map("Senha")
  userTypeId Int     @map("tipoUsuarioId")
  personId   Int?    @unique @map("PessoaId")
  active     Boolean @default(true) @map("Ativo")
  */