import authService from '../../services/auth/auth-service.js';
import userService from '../../services/user/user-service.js';
import { random5 } from '../../helpers/utils.js';

const id = random5();
describe('Users - Negative', () => {
    let body;
    let token;


    beforeAll(async () => {
        const email = 'naodeletar@qa.com.br';
        const password = 'teste';

        token = await authService.getToken(email, password);
    });

    it('Criar usuários sem nome deve falhar', async () => {
        body = {
            email: `beltrano_${id}@qa.com.br`,
            password: 'teste',
            administrador: 'true'
        };

        const res = await userService.create(body, token);

        expect([400, 422]).toContain(res.status);
        expect(res.body.nome).toContain('nome é obrigatório')
    });

    it('Criar usuários sem email deve falhar', async () => {
        body = {
            nome: `Fulano ${id}`,
            password: 'teste',
            administrador: 'true'
        };

        const res = await userService.create(body, token);

        expect([400, 422]).toContain(res.status);
        expect(res.body.email).toContain('email é obrigatório')
    });

    it('Criar usuários sem password deve falhar', async () => {
        body = {
            nome: `Fulano ${id}`,
            email: `beltrano_${id}@qa.com.br`,
            administrador: 'true'
        }

        const res = await userService.create(body, token);

        expect([400, 422]).toContain(res.status);
        expect(res.body.password).toContain('password é obrigatório')
    });

    it('Criar usuários sem administrador deve falhar', async () => {
        body = {
            nome: `Fulano ${id}`,
            email: `beltrano_${id}@qa.com.br`,
            password: 'teste',
        }

        const res = await userService.create(body, token);

        expect([400, 422]).toContain(res.status);
        expect(res.body.administrador).toContain('administrador é obrigatório')
    });

    it('Criar usuários com email duplicado deve falhar', async () => {
        body = {
            nome: `Fulano ${id}`,
            email: `beltrano_${id}@qa.com.br`,
            password: 'teste',
            administrador: 'true'
        };

        const created = await userService.create(body, token);
        expect(created.status).toBe(201);

        const userDuplicate = await userService.create(body, token);
        expect(userDuplicate.status).toBe(400);
        expect(userDuplicate.body.message).toContain('Este email já está sendo usado')

        await userService.delete(created.body._id, token);
    });

    it('Buscar usuários com id inválido deve falhar', async () => {
        const res = await userService.getById('id_invalido', token);
        expect(res.status).toBe(400);
        expect(res.body.id).toContain('id deve ter exatamente 16 caracteres alfanuméricos')
    });

    it('Atualizar usuários com id inexistente deve realizar um novo cadastro', async () => {
        const fakeId = '000000000000000000000000';

        body = {
            nome: `Fulano ${id}`,
            email: `beltrano_${id}@qa.com.br`,
            password: 'teste',
            administrador: 'true'
        };

        const res = await userService.update(fakeId, body, token);

        // O metodo PUT não retorna erro caso não encontre o ID, é realizado o novo cadastro nesse cenário.
        expect(res.status).toBe(201);
        expect(res.body.message).toContain('Cadastro realizado com sucesso')

        if (res.status === 201 && res.body && res.body._id) {
            await userService.delete(res.body._id, token);
        }
    });
});
