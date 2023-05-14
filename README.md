#
# **Passos para executar o projeto**
Este projeto utiliza as tecnologias Node.js, Docker e Prisma. Siga as instruções abaixo para executar o projeto em sua máquina local.
## **Pré-requisitos**
- Node.js instalado em sua máquina
- Docker instalado em sua máquina
- Arquivo .env com as informações de configuração do projeto (vide passo 3)
## **Passo a passo**
1. Abra o terminal e navegue até a pasta raiz do projeto.
2. Execute o comando npm i para instalar todas as dependências do projeto.
3. Crie um arquivo .env com base no arquivo .env.example fornecido e adicione suas informações de configuração do projeto (por exemplo, as credenciais do banco de dados).
4. Execute o comando docker compose up -d para iniciar o contêiner do banco de dados.
5. Execute o comando npx prisma migrate dev para aplicar as migrações do banco de dados.
6. Execute o comando npm run start para iniciar o servidor.
7. Abra outro terminal e navegue até a pasta do projeto front-end, disponível em [<https://github.com/felipidis/nest-api-frontend>].
8. Siga as instruções fornecidas no README.md do projeto front-end para continuar a configuração e execução do projeto.

O projeto está configurado para ser executado em http://localhost:3000. Certifique-se de que a porta esteja disponível em sua máquina antes de executar o projeto.
