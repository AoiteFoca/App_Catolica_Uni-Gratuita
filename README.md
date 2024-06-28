<p align="center"><img loading="lazy" src="https://portaluni.catolicasc.org.br/img/logo-responsivo-catolica.png" width="300"></p>

<h1 align="center">Aplicativo Universidade Gratuita</h1>

## Descrição
O aplicativo Mobile pretende contemplar funções básicas de um CRUD para envio de documentações por parte dos estudantes para o programa Universidade Gratuita da instituição, enquanto o aplicativo Web pretende contemplar funções básicas para análise e validação dos documentos. Todas as telas serão desenvolvidas com base na identidade visual da Católica de Santa Catarina e do programa Universidade Gratuita, prezando sua paleta de cores e design.

## Funcionalidades
O aplicativo visa permitir que os estudantes realizem a inscrição no programa Universidade Gratuita de forma simples e rápida através do aplicativo, além de abranger os membros da instituição para que possam acessar, visualizar e analisar os documentos enviados pelos estudantes de forma eficiente.<br>
Algumas de suas funções específicas são:
- **Login** - O aplicativo deve permitir a conexão do usuário caso o mesmo já possua uma conta cadastrada em seu banco de dados;
- **Cadastro** - Possibilidade do usuário criar uma conta, caso ainda não possua;
- **Administração de perfil** - A visualização e alteração dos dados básicos de cadastro devem ser possíveis de realizar por meio da página de perfil;
- **Anexo de Arquivos** - No processo de envio de arquivos, o usuário poderá tanto utilizar a câmera do celular quanto anexar o documento direto da galeria;
- **Revisão de Dados** - Após validação e notificação de dados incorretos por parte da instituição, o usuário deve ter a possibilidade de revisão e correção dos dados/documentos através de uma tela específica;
- **Armazenamento** - O aplicativo deve armazenar os documentos enviados pelos usuários e enviá-los por integração para a aplicação web desenvolvida pelo grupo para a equipe interna de avaliação da Católica;
- **Recuperação de Senha** - O aplicativo deve permitir que os usuários recuperem sua senha por meio de um processo de verificação, como envio de e-mail institucional;
- **Notificações** - O aplicativo deve contar com a funcionalidade de notificação entre aplicações (web e mobile) para que o estudante receba notificações em caso de aprovação/rejeição de dados e o usuário interno da católica.

## Instalação e Configuração do Projeto
Inicialmente, baixe a versão mais completa do aplicativo pelo *Github*;<br>

Após isso, extraia o arquivo e abra a pasta pela sua *IDE*. Estamos utilizado o [Visual Studio Code](https://code.visualstudio.com/) como padrão de desenvolvimento;<br>

Após isso, abra o Terminal (Ctrl+') do Vscode e coloque os seguintes comandos:<br>

`cd .\back-end\`<br><br>
`npm install`<br><br>
`npm install @prisma/client`<br><br>
`npm install @nestjs/core`<br>

Caso esteja recebendo algum erro de variáveis de ambiente, você precisará utilizar o seguinde comando no terminal:<br>

`npm install dotenv`<br>

Após isso, você precisará acessar o arquivo ***main.ts*** dentro de ***Back-end*** e depois ***src***.<br>
Já no *Main.ts*, descomente `//require('dotenv').config();` no início do arquivo e salve as alterações com **Ctrl+S**.<br>
*Para descomentar algo basta retirar as duas barras anteriores à linha ("//").*

Ainda dentro da pasta back-end, crie um novo arquivo chamado **".env"**.<br>
Para fazer isso, clique com o botão direito na pasta **back-end** e selecione a opção **New File** e escreva **.env** para nomear o novo arquivo.
Agora, caso este arquivo não abra automaticamente, clique sobre ele e coloque:<br>
DATABASE_URL="**Coloque_Aqui_O_Caminho_Para_Seu_Banco_De_Dados**".<br>
Por exemplo:
`DATABASE_URL="file:./meuBancoDeDados.db"`

`cd ..`<br>

`cd .\front-end\`<br>

`npm install expo`<br>

Após o término da instalação, coloque o seguinte comando:<br>

`npx expo start`<br>

Pronto, agora em seu terminal você poderá ver um código de *QR Code* para escanear.

Para escanear o *QR Code* e inicializar o projeto, vamos utilizar seu *Smartphone*  por meio do aplicativo [Expo Go](https://expo.dev/go).

Após instalado, abra o ExpoGo e selecione a opção *Scan QR Code*.<br>Após isso, apenas posicione a câmera do seu *Smartphone* para o QR Code gerado no terminal do seu Vscode e pronto!!

O aplicativo do Programa Universidade Gratuita será aberto!!

## Desenvolvimento
Foram utilizados documentos via Google Drive para criação, manutenção e edição do projeto, como o documento do [Plano de Projeto](https://docs.google.com/document/d/1fpn0aozzX96tOeue_fM_GqvWK2DGsLzv6nUYHAmPYVg/edit?usp=sharing).<br>
O controle de versionamento foi realizado pelo GitHub.<be>
O desenvolvimento de diagramas, protótipos e modelos de lógica do projeto foram feitos pelo Miro.<br>
Para o acompanhamento de cronograma e sprints, foi utilizada a metodologia ágil Kanban pelo software Jira.<br>
Além disso, a prototipagem do Design do aplicativo foi feita no Software [Figma](https://www.figma.com/design/JKyrPayAZtrfdWynmQD4RG/App-Univ.-Gratuita?node-id=10-267&t=xC98WSGOEXAZF8fp-1), pela estudante Letícia Souza.

## Contribuidores
A equipe de desenvolvimento deste projeto é constituída por alunos do curso de Engenharia de Software do Centro Universitário Católica SC de Jaraguá do Sul, seus integrantes são: Higor Azevedo, João Vitor Colombo, Lucas Henrique da Silva, Nathan Cielusinski, Nicolas Gustavo Conte e Vitor Maiochi Ziehlsdorff.

<div align="center">
<h3 align="center">Front-end</h3>
<table>
  <tr>
    <td align="center"><a href="https://github.com/HigorAz"><img loading="lazy" src="https://avatars.githubusercontent.com/u/141787745?v=4" width="115"><br><sub>Higor Azevedo</sub></a></td>
    <td align="center"><a href="https://github.com/Colombao"><img loading="lazy" src="https://avatars.githubusercontent.com/u/128653143?v=4" width="115"><br><sub>João Vitor Colombo</sub></a></td>
    <td align="center"><a href="https://github.com/lucashenrique505"><img loading="lazy" src="https://avatars.githubusercontent.com/u/130518705?v=4" width="115"><br><sub>Lucas Henrique Silva</sub></a></td>
    <td align="center"><a href="https://github.com/vitormz5"><img loading="lazy" src="https://avatars.githubusercontent.com/u/113218415?v=4" width="115"><br><sub>Vitor Maiochi Ziehlsdorff</sub></a></td>
  </tr>
</table>
<h3 align="center">Back-end</h3>
<table>
  <tr>
    <td align="center"><a href="https://github.com/AoiteFoca"><img loading="lazy" src="https://avatars.githubusercontent.com/u/141975272?v=4" width="115"><br><sub>Nathan Cielusinski</sub></a></td>
    <td align="center"><a href="https://github.com/MrNicolass"><img loading="lazy" src="https://avatars.githubusercontent.com/u/80847876?v=4" width="115"><br><sub>Nicolas Gustavo Conte</sub></a></td>
  </tr>
</table>
</div>


