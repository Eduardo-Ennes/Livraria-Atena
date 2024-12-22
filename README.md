# Livraria-Atena
 A ideia deste projeto surgiu a partir de dois pilares: minha paixão por leitura e a realidade educacional carente na minha cidade. A Livraria Atena é um e-commerce de venda de livros, e atualmente está sendo utilizada como portfólio. No entanto, novas ideias estão surgindo para torná-la ainda mais robusta e funcional, ou quem sabe, um dia, transformá-la em uma realidade.

 Este é o meu primeiro projeto na minha jornada como desenvolvedor. Até agora, a Livraria Atena foi desenvolvida exclusivamente por mim, mas tenho o objetivo de integrar outro participante que também esteja iniciando sua jornada, visando uma troca de conhecimento mais rica e colaboração no projeto.  

# Funcionalidades
 - criação,login e logout de usuários.
 - criação e atualização de endereço de entrega.
 - criação, deleção e atualização de perfil para publicar livros.
 - criação, deleção e atualização para endereço de perfil de vendedor.
 - criação, deleção e atualização para produtos(livros).
 - sistema de validação de cnpj e número de telefone
 - sistema de carrinho com verificações: quantidade junto ao banco de dados e impede de adicionar produto próprio.
 - sistema de promoção sendo calculado para o valor final.
 - integração backend, frontend e api.
 - middleware de autenticação.

# Tecnologias e Versões Utilizadas
 Backend:
 "@types/express": "^4.17.17" (Tipagens TypeScript para o framework Express, proporcionando autocompletar e verificação de tipos), <br>
 "@types/jsonwebtoken": "^9.0.7" (Tipagens TypeScript para a biblioteca jsonwebtoken, usada para criar e verificar tokens JWT),<br>
 "bcryptjs": "^2.4.3" (Biblioteca para criptografia de senhas. Usada para criar hashes de senhas de forma segura),<br>
 "body-parse": "^0.1.0" (Middleware para fazer o parsing de dados de requisições HTTP, como JSON e URL-encoded.),<br>
 "cors": "^2.8.5" (Middleware para permitir requisições entre diferentes origens Cross-Origin Resource Sharing, essencial para APIs.),<br>
 "express": "^4.21.1" (Framework minimalista e flexível para construção de APIs e servidores web em Node.js.),<br>
 "jsonwebtoken": "^9.0.2" (Biblioteca para criar e verificar tokens JWT, usada para autenticação e autorização.),<br>
 "knex": "^3.1.0" (Query builder SQL para Node.js, usado para facilitar a construção de consultas SQL.),<br>
 "multer": "^1.4.5-lts.1" (Middleware para processamento de arquivos multipart/form-data, utilizado para upload de arquivos.),<br>
 "mysql2": "^3.11.4" (Cliente MySQL para Node.js, utilizado para se conectar e interagir com bancos de dados MySQL.),<br>
 "path": "^0.12.7" (Utilitário para manipulação de caminhos de arquivos e diretórios, essencial para trabalhar com arquivos no Node.js.),<br>
 "redis": "^4.7.0" (Cliente Redis para Node.js, utilizado para armazenar dados em cache ou gerenciar sessões de usuário.),<br>
 "sharp": "^0.33.5" (Biblioteca para processamento de imagens, utilizada para redimensionamento, conversão e otimização de imagens.),<br>
 "ts-node": "^10.9.2" (Executa código TypeScript diretamente no Node.js, sem a necessidade de compilar antes.),<br>
 "ts-node-dev": "^2.0.0" (Ferramenta para desenvolvimento com TypeScript, que recarrega o servidor de forma mais eficiente.),<br>
 "typescript": "^5.6.3" (Superset do JavaScript que adiciona tipagem estática e recursos avançados de desenvolvimento.), <br>
 "@types/bcryptjs": "^2.4.6" (Tipagens TypeScript para a biblioteca bcryptjs.), <br>
 "@types/cors": "^2.8.17" (Tipagens TypeScript para a biblioteca cors.), <br>
 "@types/node": "^22.9.1" (Tipagens TypeScript para o ambiente Node.js, fornecendo suporte para módulos e funções nativas.), <br>
 "tsx": "^4.19.2" (Utilitário para executar arquivos TypeScript diretamente com suporte para JSX, usado em projetos com React.)

 Frontend: 
 
 "react": "^18.3.1",<br>
 "react-dom": "^18.3.1",<br>
 "react-router-dom": "^7.0.1"<br

 !Estas já são dependências automaticas quando se inicializa um projeto com react vite.! 

# Pré-Requisitos 
 - Node.js
 - MySql
 - Redis
 - React

# Estrutura do banco de dados
 users: 
 id_user int primary_key auto_increment, 
 first_name varchar(45), 
 last_name varchar(45), 
 email varchar(75), 
 password varchar(100), 
 role int, 
 create_at CURRENT_TIMESTAMP, 
 update_at CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

 products: 
 id_product int primary_key auto_increment, 
 image varchar(100), 
 name varchar(55), 
 description text, 
 price decimal(10,2), 
 quantity int, 
 activate tinyint, 
 category tinyint, 
 promotion tinyint, 
 price_promotion decimal(10,2), 
 create_at CURRENT_TIMESTAMP, 
 update_at CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
 own int foreign_key reference: id_user

 breve explicação dos campos activate, category e own. 
 
 O campo activate será preenchido com os números 0 ou 1, 0 para produto existente, porém, não está disponível no momento e 1 para produto publicado e disponível.

 O campo category será preenchido por números que corresponderam a uma categoria, exemplo usado neste projeto: 1 = ficção, 2 = história e 3 = auto-ajuda

 o campo own é uma foreign key que se relaciona com o id_user, para relacionar um usuário a um livro. Seria uma relação para demarcar o proprietário deste livro.

 address: 
 id int primary_key auto_increment, 
 state varchar(18), 
 city varchar(45), 
 neighborhood varchar(45), 
 street varchar(75), 
 number int, 
 complement text, 
 creat_at CURRENT_TIMESTAMP, 
 update_at CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
 own int foreign_key reference: id_user

 breve explicação do campo own.

 o campo own é uma foreign key que se relaciona com o id_user, para relacionar um usuário a um endereço. Seria uma relação para demarcar o proprietário deste endereço.

 seller: 
 id_seller int primary_key auto_increment, 
 cnpj varchar(18), 
 state varchar(18), 
 city varchar(45), 
 street varchar(75), 
 number varchar(10), 
 phone varchar(14), 
 create_at CURRENT_TIMESTAMP, 
 update_at CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
 own int foreign_key reference: id_user

 breve explicação do campo own.

 o campo own é uma foreign key que se relaciona com o id_user, para relacionar um usuário a um perfil de vendedor. Seria uma relação para demarcar o proprietário deste perfil de vendedor.

# Configurações MySql
 Livraria-Atena/back/src/database/connection.ts

 ```javascript
 import knex from 'knex';

 const db = knex({
   client: 'mysql2',
   connection: {
   host: '127.0.0.1',
   port: 3306,
   user: 'NomeDoUsuário',
   password: 'Senha',
   database: 'NomeDoBancoDeDados',
   },
 });

 export default db;
 ```

# Configurações Redis
 Criação de um arquivo .env na pasta Livraria-Atena/back e insira: 
 ```env
 REDIS_URL=redis://:Livraria-Atena@127.0.0.1:6379
 ```

 Livraria-Atena/back/src/redis/redisClient.ts

 ```javascript
 import { createClient } from 'redis'
 import dotenv from 'dotenv'
 dotenv.config()

 const client = createClient({
    url: process.env.REDIS_URL
 });
  
 client.on('error', (err) => {
    console.error('Erro de conexão com o Redis:', err);
 });

 export default client;
 ```

# Configurações server.ts
 O arquivo serve.ts é o nosso arquivo principal onde se inicializa aplicação. Encontrado no caminho Livraria-Atena/back/server.ts

 segue as configurações e suas explicações abaixo:

```javascript
 import express from 'express'
 import cors from 'cors'
 import router from './routes/http'
 import 'reflect-metadata'
 import client from './redis/redisClient'
 import path from 'path'
// import db from '../database/Connection' 

 const app = express()

// Middleware para permitir JSON e dados de formulários
 app.use(express.urlencoded({ extended: false }))
 app.use(express.json())

// Teste de conexão com o banco de dados
// db.raw('SELECT 1')
//   .then(() => {
//     console.log('Conexão bem-sucedida ao MySQL!');
//     db.destroy();  // Fecha a conexão após o teste
//   })
//   .catch((err) => {
//     console.error('Erro ao conectar ao MySQL:', err.message);
//     db.destroy();  // Fecha a conexão em caso de erro
//     });

// Configuração de CORS
 app.use(cors())

// Url para exibir imagens no frontend
 const uploadsDir = path.join(__dirname, 'uploads');
 app.use('/uploads', express.static(uploadsDir));

// Rotas
 app.use(router)

// Estou inicializando o projeto desta forma, por que se o redis apresentar algum tipo de problema a aplicação não se inicia e o erro do redis é mostrado no terminal.
 const startServer = async () => {
    try{
        // Conecta o redis
        if (!client.isOpen) {
            await client.connect();
            console.log('Conectado ao Redis');
        } else {
            console.log('Redis já está conectado.');
        }
        
        // Inicializa a aplicação
        app.listen(8080, () => {
            console.log('Servidor inicializado na porta 8080.')
        })

    }catch(err){
        console.log('Inicialização do servidor: ' + err)
    }
 }

 startServer()
 ``` 

# Como executar
```javascript
 configure o backend:
 cd back 
 npm install 
 npm run dev 
 // Não é necessário nenhuma versão especifica
```

```javascript
 configure o frontend: 
 cd front 
 npm install 
 npm run dev 
 // Não é necessário nenhuma versão especifica
```

# Licença
 Este projeto é disponibilizado exclusivamente para fins educativos. Você pode utilizá-lo para aprendizado, estudar as tecnologias implementadas e até mesmo como base para seus próprios projetos.