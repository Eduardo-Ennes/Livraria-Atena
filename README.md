# Livraria-Atena
 A ideia deste projeto surgiu a partir de dois pilares: minha paixão por leitura e a realidade educacional carente na minha cidade. A Livraria Atena é um e-commerce de venda de livros, e atualmente está sendo utilizada como portfólio. No entanto, novas ideias estão surgindo para torná-la ainda mais robusta e funcional, ou quem sabe, um dia, transformá-la em uma realidade.

 Este é o meu primeiro projeto na minha jornada como desenvolvedor. Até agora, a Livraria Atena foi desenvolvida exclusivamente por mim, mas tenho o objetivo de integrar outro participante que também esteja iniciando sua jornada, visando uma troca de conhecimento mais rica e colaboração no projeto.  

# Funcionalidades
 - criação e login de usuários.
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
 "@types/express": "^4.17.17" (Tipagens TypeScript para o framework Express, proporcionando autocompletar e verificação de tipos),

 "@types/jsonwebtoken": "^9.0.7" (Tipagens TypeScript para a biblioteca jsonwebtoken, usada para criar e verificar tokens JWT),

 "bcryptjs": "^2.4.3" (Biblioteca para criptografia de senhas. Usada para criar hashes de senhas de forma segura),

 "body-parse": "^0.1.0" (Middleware para fazer o parsing de dados de requisições HTTP, como JSON e URL-encoded.),

 "cors": "^2.8.5" (Middleware para permitir requisições entre diferentes origens Cross-Origin Resource Sharing, essencial para APIs.),

 "express": "^4.21.1" (Framework minimalista e flexível para construção de APIs e servidores web em Node.js.),

 "jsonwebtoken": "^9.0.2" (Biblioteca para criar e verificar tokens JWT, usada para autenticação e autorização.),

 "knex": "^3.1.0" (Query builder SQL para Node.js, usado para facilitar a construção de consultas SQL.),

 "multer": "^1.4.5-lts.1" (Middleware para processamento de arquivos multipart/form-data, utilizado para upload de arquivos.),

 "mysql2": "^3.11.4" (Cliente MySQL para Node.js, utilizado para se conectar e interagir com bancos de dados MySQL.),

 "path": "^0.12.7" (Utilitário para manipulação de caminhos de arquivos e diretórios, essencial para trabalhar com arquivos no Node.js.),

 "redis": "^4.7.0" (Cliente Redis para Node.js, utilizado para armazenar dados em cache ou gerenciar sessões de usuário.),

 "sharp": "^0.33.5" (Biblioteca para processamento de imagens, utilizada para redimensionamento, conversão e otimização de imagens.),

 "ts-node": "^10.9.2" (Executa código TypeScript diretamente no Node.js, sem a necessidade de compilar antes.),

 "ts-node-dev": "^2.0.0" (Ferramenta para desenvolvimento com TypeScript, que recarrega o servidor de forma mais eficiente.),

 "typescript": "^5.6.3" (Superset do JavaScript que adiciona tipagem estática e recursos avançados de desenvolvimento.)

 "@types/bcryptjs": "^2.4.6" (Tipagens TypeScript para a biblioteca bcryptjs.),

 "@types/cors": "^2.8.17" (Tipagens TypeScript para a biblioteca cors.),

 "@types/node": "^22.9.1" (Tipagens TypeScript para o ambiente Node.js, fornecendo suporte para módulos e funções nativas.),

 "tsx": "^4.19.2" (Utilitário para executar arquivos TypeScript diretamente com suporte para JSX, usado em projetos com React.)

 Frontend: 
 "react": "^18.3.1",
 "react-dom": "^18.3.1",
 "react-router-dom": "^7.0.1"
 !Estas já são dependências automaticas quando se inicializa um projeto com react vite.! 

# Pré-Requisitos