# Testes_API

API REST em Node.js com testes automatizados.

- `API/app.js`: CRUD de `usuarios` e `tarefas` (GET, POST, PUT, DELETE), com MySQL.
- `API/app.test.js`: testes com Jest e Supertest.
- `Caique_API.sql`: script de criação do banco de dados.
- `API_Teste.docx`: documento de testes.

## Como rodar

```
cd API
npm install
node app.js
```

Servidor em http://localhost:3000. É necessário um MySQL com o banco criado pelo script `Caique_API.sql` e a conexão configurada em `API/db.js`.

## Testes

```
cd API
npx jest
```

## Tecnologias

Node.js, Express, MySQL (mysql2), CORS, Jest, Supertest.
