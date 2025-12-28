import GenericService from '../generic-service.js';

class AuthService extends GenericService {
  constructor() {
    super('/login');
    this.token = null;
  }

  login(email, password, { headers } = {}) {
    return super.create({ email, password }, { headers });
  }

  async getToken(email, password) {
    const response = await this.login(email, password);
    this.token = response.body.authorization;

    return this.token;
  }
}

export default new AuthService();
