const request = require('supertest');
const app = require('./app.js'); 
const db = require('./db'); 

jest.setTimeout(10000); 


afterAll(async () => {
    
    await db.end();
});

describe('Fluxo Completo de Usuário', () => {
    let userId;

    test('deve criar um novo usuário', async () => {
        const res = await request(app) 
            .post('/usuarios')
            .send({
                nome: 'Teste Integracao',
                email: 'integracao@test.com',
                senha: '123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Usuario inserido com sucesso!');

        const [rows] = await db.promise().query('SELECT id FROM usuarios WHERE email = ?', ['integracao@test.com']);
        userId = rows[0].id;
        expect(userId).toBeDefined();
    });

    test('deve listar o usuário recém-criado', async () => {
        const res = await request(app).get('/usuarios');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: userId,
                    nome: 'Teste Integracao',
                    email: 'integracao@test.com'
                })
            ])
        );
    });

    test('deve atualizar o usuário', async () => {
        const res = await request(app)
            .put(`/usuarios/${userId}`)
            .send({
                nome: 'Teste Atualizado',
                email: 'integracao_nova@test.com',
                senha: '456'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Usuario atualizado com sucesso!');
    });

    test('deve deletar o usuário', async () => {
        const res = await request(app).delete(`/usuarios/${userId}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Usuario deletado com sucesso!');
    });

    test('não deve mais listar o usuário deletado', async () => {
        const res = await request(app).get('/usuarios');
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: userId })
            ])
        );
    });
});