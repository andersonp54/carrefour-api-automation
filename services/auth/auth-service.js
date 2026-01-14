import GenericService from '../generic-service.js';
import userService from '../../services/user/user-service.js';

class AuthService extends GenericService {
  constructor() {
    super('/login');
    this.token = null;
  }

  login(email, password, { headers } = {}) {
    return super.create({ email, password }, { headers });
  }

  async getToken(email, password) {
    let response = await this.login(email, password);
    this.token = response.body.authorization;

    if (!this.token) {
      body = {
        nome: `Fulano Automation`,
        email: email,
        password: password,
        administrador: 'true'
      };

      await userService.create(body, '');

      response = await this.login(email, password);
      this.token = response.body.authorization;
    }

    return this.token;
  }
}

export default new AuthService();
