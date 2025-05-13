# Comandos Docker para rodar o Marmeasy

Este arquivo contém os comandos necessários para rodar o sistema Marmeasy em ambiente de **produção** e **desenvolvimento**, utilizando Docker e Docker Compose.

---

## 🛠️ Ambiente de Desenvolvimento

### Subir os containers em modo desenvolvimento

```bash
docker compose up --build -d
```

> Este comando usa o `docker-compose.yml` padrão da raiz do projeto, geralmente configurado para desenvolvimento (com volumes montados, hot-reload, etc.).

### Derrubar os containers

```bash
docker compose down
```

---

## 🚀 Ambiente de Produção

### Subir os containers em modo produção

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

> Usa o arquivo `docker-compose.prod.yml`, constrói as imagens e sobe os serviços em segundo plano (`-d`).

### Derrubar os containers de produção

```bash
docker compose -f docker-compose.prod.yml down
```

---

## 🧹 Comandos úteis (ambos os ambientes)

### Ver logs da API

```bash
docker logs -f marmeasy_api
```

### Acessar o container da API

```bash
docker exec -it marmeasy_api sh
```

### Acessar o container do PostgreSQL

```bash
docker exec -it marmeasy_db psql -U root
```

---

## 🔄 Rebuild forçado da imagem da API

```bash
docker compose -f docker-compose.prod.yml build --no-cache
```

> Quando quiser garantir que tudo seja recompilado do zero (sem cache).

---

## 🧪 Verificar containers ativos

```bash
docker ps
```

---

> Certifique-se de que os arquivos `.env` e `.env.prod` estejam configurados corretamente antes de executar os comandos.
