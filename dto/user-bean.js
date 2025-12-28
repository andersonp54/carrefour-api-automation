export class UserBean {
  static schema = {
    type: 'object',
    required: ['_id', 'nome', 'email', 'password', 'administrador'],
    additionalProperties: true,
    properties: {
      _id: { type: 'string', minLength: 1 },
      nome: { type: 'string', minLength: 1 },
      email: { type: 'string', minLength: 1, format: 'email' },
      password: { type: 'string', minLength: 1 },
      administrador: { type: 'string', enum: ['true', 'false'] }
    }
  };

  static listSchema = {
    type: 'object',
    required: ['quantidade', 'usuarios'],
    additionalProperties: true,
    properties: {
      quantidade: { type: 'number' },
      usuarios: {
        type: 'array',
        items: UserBean.schema
      }
    }
  };

  static createResponseSchema = {
    type: 'object',
    required: ['message', '_id'],
    additionalProperties: true,
    properties: {
      message: { type: 'string', minLength: 1 },
      _id: { type: 'string', minLength: 1 }
    }
  };
}
