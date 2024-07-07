-- CreateTable
CREATE TABLE "TipoUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoUsuario" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Login" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "tipoUsuarioId" INTEGER NOT NULL,
    "PessoaId" INTEGER,
    CONSTRAINT "Usuario_tipoUsuarioId_fkey" FOREIGN KEY ("tipoUsuarioId") REFERENCES "TipoUsuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_PessoaId_fkey" FOREIGN KEY ("PessoaId") REFERENCES "Pessoa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EstadoCivil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estadoCivil" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CorRaca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "corRaca" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sexo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sexo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uf" TEXT NOT NULL,
    "nomeEstado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCidade" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,
    CONSTRAINT "Cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "CEP" INTEGER NOT NULL,
    "cidadeId" INTEGER NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    CONSTRAINT "Endereco_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RelacaoPessoaEndereco" (
    "pessoaId" INTEGER NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    PRIMARY KEY ("pessoaId", "enderecoId"),
    CONSTRAINT "RelacaoPessoaEndereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RelacaoPessoaEndereco_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrauParentesco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grau" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GrupoFamiliar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "GrauParentescoID" INTEGER NOT NULL,
    "formacao" TEXT NOT NULL,
    "ocupacao" TEXT NOT NULL,
    CONSTRAINT "GrupoFamiliar_GrauParentescoID_fkey" FOREIGN KEY ("GrauParentescoID") REFERENCES "GrauParentesco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RelacaoPessoaFamilia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pessoaId" INTEGER,
    "grupoFamiliarId" INTEGER,
    CONSTRAINT "RelacaoPessoaFamilia_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RelacaoPessoaFamilia_grupoFamiliarId_fkey" FOREIGN KEY ("grupoFamiliarId") REFERENCES "GrupoFamiliar" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Modalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modalidade" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCurso" TEXT NOT NULL,
    "numeroFases" INTEGER NOT NULL,
    "modalidadeId" INTEGER NOT NULL,
    CONSTRAINT "Curso_modalidadeId_fkey" FOREIGN KEY ("modalidadeId") REFERENCES "Modalidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Graduacao" (
    "matriculaIES" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "instituicao" TEXT NOT NULL,
    "dataIngressoInstituicao" DATETIME NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "fase" INTEGER NOT NULL,
    "anoSemestre" INTEGER NOT NULL,
    CONSTRAINT "Graduacao_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telefone" TEXT,
    "telefoneComercial" TEXT,
    "celular" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RelacaoPessoaTelefone" (
    "pessoaId" INTEGER NOT NULL,
    "telefoneId" INTEGER NOT NULL,

    PRIMARY KEY ("pessoaId", "telefoneId"),
    CONSTRAINT "RelacaoPessoaTelefone_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RelacaoPessoaTelefone_telefoneId_fkey" FOREIGN KEY ("telefoneId") REFERENCES "Telefone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deficiencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doencaInvalidez" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RelacaoPessoaDeficiencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pessoaId" INTEGER NOT NULL,
    "deficienciaId" INTEGER NOT NULL,
    CONSTRAINT "RelacaoPessoaDeficiencia_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RelacaoPessoaDeficiencia_deficienciaId_fkey" FOREIGN KEY ("deficienciaId") REFERENCES "Deficiencia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Despesas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "despMensalHabitacao" REAL NOT NULL,
    "despFamTransporte" REAL,
    "despFamDoenca" REAL,
    "despFarEstudo" REAL
);

-- CreateTable
CREATE TABLE "Moradia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Documentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pessoaId" INTEGER NOT NULL,
    "inscricao" TEXT NOT NULL,
    "numPesGrupoFamiliar" TEXT NOT NULL,
    "situacaoCivil" TEXT NOT NULL,
    "rendaFamiliar" TEXT NOT NULL,
    "impostoDeRenda" TEXT NOT NULL,
    "bensFamiliares" TEXT NOT NULL,
    "tipoMoradia" TEXT NOT NULL,
    "despesasMoradia" TEXT NOT NULL,
    "residenciaSC" TEXT NOT NULL,
    "ensinoMedio" TEXT NOT NULL,
    "despesaTransporte" TEXT,
    "despesaDoenca" TEXT,
    "deficiencia" TEXT,
    "despesaEducacao" TEXT,
    "adesaoUniGratuita" TEXT NOT NULL,
    CONSTRAINT "Documentos_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "nomePai" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "naturalidade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "estadoCivilId" INTEGER NOT NULL,
    "corRacaId" INTEGER NOT NULL,
    "sexoId" INTEGER NOT NULL,
    "ensinoMedio" BOOLEAN NOT NULL,
    "possuiGraduacao" BOOLEAN NOT NULL,
    "assistPublica" BOOLEAN NOT NULL,
    "resideSC" INTEGER NOT NULL,
    "rendaFamiliarBruta" REAL NOT NULL,
    "rendaPerCapita" REAL NOT NULL,
    "bensFamilia" REAL NOT NULL,
    "despesasId" INTEGER NOT NULL,
    "situacaoDesemprego" BOOLEAN NOT NULL,
    "graduacaoId" INTEGER NOT NULL,
    "tipoMoradiaId" INTEGER NOT NULL,
    CONSTRAINT "Pessoa_estadoCivilId_fkey" FOREIGN KEY ("estadoCivilId") REFERENCES "EstadoCivil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pessoa_corRacaId_fkey" FOREIGN KEY ("corRacaId") REFERENCES "CorRaca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pessoa_sexoId_fkey" FOREIGN KEY ("sexoId") REFERENCES "Sexo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pessoa_despesasId_fkey" FOREIGN KEY ("despesasId") REFERENCES "Despesas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pessoa_graduacaoId_fkey" FOREIGN KEY ("graduacaoId") REFERENCES "Graduacao" ("matriculaIES") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pessoa_tipoMoradiaId_fkey" FOREIGN KEY ("tipoMoradiaId") REFERENCES "Moradia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_PessoaId_key" ON "Usuario"("PessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_uf_key" ON "Estado"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_estadoId_key" ON "Cidade"("estadoId");

-- CreateIndex
CREATE UNIQUE INDEX "GrupoFamiliar_cpf_key" ON "GrupoFamiliar"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "RelacaoPessoaFamilia_pessoaId_grupoFamiliarId_key" ON "RelacaoPessoaFamilia"("pessoaId", "grupoFamiliarId");

-- CreateIndex
CREATE UNIQUE INDEX "RelacaoPessoaDeficiencia_deficienciaId_key" ON "RelacaoPessoaDeficiencia"("deficienciaId");

-- CreateIndex
CREATE UNIQUE INDEX "RelacaoPessoaDeficiencia_pessoaId_deficienciaId_key" ON "RelacaoPessoaDeficiencia"("pessoaId", "deficienciaId");

-- CreateIndex
CREATE UNIQUE INDEX "Documentos_pessoaId_key" ON "Documentos"("pessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_rg_key" ON "Pessoa"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_despesasId_key" ON "Pessoa"("despesasId");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_tipoMoradiaId_key" ON "Pessoa"("tipoMoradiaId");
