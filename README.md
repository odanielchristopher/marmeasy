# Sistema de Gerenciamento de Marmitaria - Marmeasy

## Visão Geral
Bem-vindo ao **Marmeasy**, um sistema desktop projetado para facilitar o gerenciamento de marmitarias. O objetivo é oferecer uma solução eficiente para controle de pedidos, pagamentos, cardápios e relatórios financeiros, garantindo uma gestão mais organizada e produtiva.

O Marmeasy é voltado para gerentes de marmitarias, com uma interface intuitiva que simplifica o aprendizado e o uso diário. Além disso, o sistema permite personalizações para atender às necessidades específicas de cada negócio.

---

## Funcionalidades Principais

### 1. **Gestão de Pedidos**
- Cadastro, edição e deleção de pedidos.
- Acompanhamento de histórico de pedidos e análises estatísticas.

### 2. **Controle de Cardápio**
- Criação, edição e exclusão de cardápios.

### 3. **Gestão Financeira**
- Registro de pagamentos e faturamento.
- Geração de relatórios financeiros abrangentes.
- Controle de despesas operacionais.

### 4. **Relatórios e Análises**
- Relatórios de pedidos populares e lucrativos.
- Análises financeiras por cliente empresarial.

### 5. **Cadastro e Gerenciamento de Empresas**
- Cadastro, edição e deleção de clientes físicos e jurídicos.

### 6. **Usuários**
- Cadastro de novos usuários na plataforma.
- Login seguro para acesso ao sistema.

---

## Tecnologias Utilizadas

- **Frontend**: Desenvolvido em React utilizando Electron e Vite para criar uma interface desktop moderna e eficiente.
- **Backend**: Implementado com NestJS, integrando o banco de dados PostgreSQL via Prisma ORM.
- **Banco de Dados**: PostgreSQL, gerenciado com suporte a migrações e automação via Docker e Docker Compose.

---

## Instalação e Configuração

1. **Requisitos Prévios**:
   - Node.js (v20.18 ou superior).
   - Docker e Docker Compose.

2. **Configuração do Ambiente**:
   - Clone este repositório:
     ```bash
     git clone https://github.com/seu-repositorio/marmeasy.git
     ```
   - Instale as dependências do frontend:
     ```bash
     cd frontend && npm install
     ```

3. **Configuração do Banco de Dados**:
   - Crie um arquivo `.env` na pasta **api** com as variáveis necessárias (exemplo no `.env.example`).
   - Configure as credenciais do PostgreSQL.

4. **Iniciar o Sistema**:
   - Entre na pasta **api** e inicie os contêineres com Docker Compose:
     ```bash
     cd api && docker-compose up
     ```
   - Execute o frontend:
     ```bash
     cd frontend && npm run dev
     ```

---

**Marmeasy** - Simplificando a gestão de marmitarias.

