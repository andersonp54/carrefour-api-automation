import authService from '../../services/auth/auth-service.js';
import userService from '../../services/user/user-service.js';
import { schemaValidator, random5 } from '../../helpers/utils.js';
import { UserBean } from '../../dto/user-bean.js';

const id = random5();

describe('Users - Contract', () => {
  let token;


  beforeAll(async () => {
    const email = 'naodeletar@qa.com.br';
    const password = 'teste';

    token = await authService.getToken(email, password);
  });

  it('Busca de usuarios deve respeitar o schema de listagem', async () => {
    const res = await userService.getAll(token);

    expect(res.status).toBe(200);
    schemaValidator(res.body, UserBean.listSchema);

    if (res.body.usuarios.length > 0) {
      expect(res.body.usuarios[0].nome).toBeTruthy();
      expect(res.body.usuarios[0]._id).toBeTruthy();
    }
  });

  it('Busca de usuario deve respeitar o schema do usuário', async () => {
    const body = {
      nome: `Fulano ${id}`,
      email: `beltrano_${id}@qa.com.br`,
      password: 'teste',
      administrador: 'true'
    };

    const created = await userService.create(body, token);
    expect(created.status).toBe(201);

    const userId = created.body._id;

    const get = await userService.getById(userId, token);
    expect(get.status).toBe(200);

    schemaValidator(get.body, UserBean.schema);

    await userService.delete(userId, token);
  });
});