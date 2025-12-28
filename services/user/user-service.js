import GenericService from '../generic-service.js';

class UserService extends GenericService {
  constructor() {
    super('/usuarios');
  }
  
}

export default new UserService();
