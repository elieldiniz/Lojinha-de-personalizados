# 📦 Backend - IroPerson

## 📌 Visão Geral
Este repositório contém o backend do projeto **IroPerson**, desenvolvido com **NestJS** e **Prisma** para gerenciar produtos, pedidos e autenticação de usuários. O projeto já implementa endpoints essenciais para controle de produtos e pedidos, além de uma estrutura modular bem definida.

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **NestJS**
- **Prisma ORM**
- **TypeScript**
- **JWT para autenticação**

## 📂 Estrutura do Projeto
```
apps/
  ├── backend/
      ├── prisma/                 # Configuração do Prisma ORM
      ├── src/
          ├── auth/               # Módulo de autenticação
          │   ├── auth.controller.ts
          │   ├── auth.module.ts
          │   ├── bcrypt.provider.ts
          │   ├── repo.usuario.prisma.ts
          │   ├── DTOs (CriarUsuarioDTO, UsuarioRespostaDTO)
          ├── db/                 # Configuração do banco de dados
          │   ├── db.module.ts
          │   ├── prisma.provider.ts
          ├── pedido/             # Módulo de pedidos
          │   ├── pedido.controller.ts
          │   ├── pedido.module.ts
          │   ├── pedido.prisma.ts
          ├── produto/            # Módulo de produtos
          │   ├── produto.controller.ts
          │   ├── produto.module.ts
          │   ├── produto.prisma.ts
          ├── app.module.ts       # Módulo principal
```

## 🔑 Autenticação
A autenticação de usuários é baseada em **JWT**, garantindo segurança na comunicação entre cliente e servidor.

## 📌 Endpoints Implementados

### 📦 Produtos
- **POST `/produto`** - Criar um novo produto.
- **GET `/produto`** - Listar todos os produtos.
- **GET `/produto/:id`** - Buscar um produto pelo ID.
- **DELETE `/produto/:id`** - Remover um produto pelo ID.

### 📦 Pedidos
- **POST `/pedidos`** - Criar um novo pedido.
- **GET `/pedidos`** - Listar todos os pedidos.
- **GET `/pedidos/:id`** - Buscar um pedido pelo ID.
- **DELETE `/pedidos/:id`** - Remover um pedido pelo ID.

## 📌 Como Executar o Projeto
1. Clone o repositório:
   ```sh
   git clone https://github.com/seuusuario/iroperson-backend.git
   ```
2. Instale as dependências:
   ```sh
   cd iroperson-backend
   npm install
   ```
3. Configure as variáveis de ambiente (`.env`):
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/meubanco"
   JWT_SECRET="sua_chave_secreta"
   ```
4. Execute as migrações do banco de dados:
   ```sh
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```sh
   npm run start:dev
   ```

## 🛠️ Futuras Implementações
- 🔜 Integração com sistema de pagamentos.
- 🔜 Implementação de perfis de usuários com diferentes permissões.
- 🔜 Melhorias na documentação com Swagger.
- 🔜 Testes automatizados.

## 🤝 Contribuições
Contribuições são bem-vindas! Para colaborar:
1. Faça um fork do repositório.
2. Crie uma branch com sua funcionalidade:
   ```sh
   git checkout -b minha-feature
   ```
3. Faça commit das mudanças:
   ```sh
   git commit -m "Adiciona nova funcionalidade X"
   ```
4. Envie a branch para o repositório remoto:
   ```sh
   git push origin minha-feature
   ```
5. Abra um **Pull Request**.

## 📄 Licença
Este projeto está licenciado sob a **MIT License**. Sinta-se à vontade para usá-lo e modificá-lo.

---
Desenvolvido por **Seu Nome** 🚀

