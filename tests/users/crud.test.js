import authService from '../../services/auth/auth-service.js';
import userService from '../../services/user/user-service.js';
import { random5 } from '../../helpers/utils.js';

const id = random5();

describe('Users - CRUD', () => {
    let userId;
    let body;
    let token;


    beforeAll(async () => {
        const email = 'naodeletar@qa.com.br';
        const password = 'teste';

        token = await authService.getToken(email, password);
    });

    afterAll(async () => {
        if (userId) {
            await userService.delete(userId, token);
        }
    });

    it('Criar usuário', async () => {
        body = {
            nome: `Fulano ${id}`,
            email: `beltrano_${id}@qa.com.br`,
            password: 'teste',
            administrador: 'true'
        };

        const res = await userService.create(body, token);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.message).toContain('Cadastro realizado com sucesso')

        userId = res.body._id;
    });

    it('Buscar usuário por id', async () => {
        const res = await userService.getById(userId, token);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', userId);
        expect(res.body.email).toBeTruthy();
        expect(res.body.nome).toBeTruthy();
        expect(res.body.administrador).toBeTruthy();
    });

    it('Atualizar usuário', async () => {
        const updatedUser = {
            nome: `${body.nome} Updated`,
            email: body.email,
            password: body.password,
            administrador: body.administrador
        };

        let res = await userService.update(userId, updatedUser, token);
        expect(res.status).toBe(200);

        res = await userService.getById(userId, token);
        if (res.status === 200) {
            expect(res.body.nome).toBe(updatedUser.nome);
        }
    });

    it('Excluir usuário', async () => {
        const res = await userService.delete(userId, token);
        expect(res.status).toBe(200);

        const resGet = await userService.getById(userId, token);
        expect([400, 404]).toContain(resGet.status);
        expect(resGet.body.message).toContain('Usuário não encontrado')

        userId = null;
    });
});
