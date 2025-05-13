# Etapa 1: build
FROM node:22.14-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY tsconfig* ./
COPY .env.prod .env

# Instala dependências completas
RUN yarn install

# Copia os arquivos
COPY . .

# Gera Prisma Client
RUN yarn prisma generate

# Etapa 2: imagem final
FROM node:22.14-alpine

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production

EXPOSE 3001

CMD ["yarn", "start:prod"]
