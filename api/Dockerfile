# Use a imagem base do Node.js na versão 20.18
FROM node:20.18-alpine

# Definindo o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiando os arquivos de dependências
COPY package*.json ./

# Instalando as dependências (incluindo devDependencies)
RUN npm install

# Copiando o restante do código para o container
COPY . .

# Gerando o cliente do Prisma
RUN npx prisma generate

# Instalando o @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Expondo a porta usada pela API
EXPOSE 3000

# Comando inicial para rodar em modo desenvolvimento
CMD ["npm", "run", "start:prod"]
