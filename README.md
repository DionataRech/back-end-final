# 📚 API de Cadastro de Usuários 📚
Bem-vindo ao repositório da API de cadastro de usuários! Esta API foi construída usando Node.js e Express.js.

Banco de dados ainda nao integrado !!!

🚀 Começando
Estas instruções vão fazer com que você tenha uma cópia do projeto rodando na sua máquina local para fins de desenvolvimento e teste. Vamos lá?

📋 Pré-requisitos
O que você precisa para rodar o software:

Node.js
npm ou yarn

### 🔧 Instalação

1. Clone o repositório
2. Entre no diretório do projeto
3. Instale as dependências
4. Inicie o servidor
5. yarn start
6. 
O servidor estará em execução em https://crud-de-recados.onrender.com

📚 Uso
Aqui estão alguns exemplos de como usar esta API:

📚Usando o ~Postman~ aplique as rotas !📚

Para obter todos os usuários:

GET https://crud-de-recados.onrender.com/api/usuarios/listados

Para obter informações de um usuário específico:

GET https://crud-de-recados.onrender.com/api/usuario/:email

Para cadastrar um novo usuário:

POST https://crud-de-recados.onrender.com/api/usuarios

Para atualizar informações de um usuário:

PUT https://crud-de-recados.onrender.com/api/usuario/atualizar/:email

Para deletar um usuário:

DELETE https://crud-de-recados.onrender.com/api/usuario/atualizar/:email
