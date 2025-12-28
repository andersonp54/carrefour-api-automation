import supertest from 'supertest';
import { loadEnv } from './env.js';

loadEnv();


export default class GenericService {
    constructor(resource) {
        this.resource = resource;
        const baseUrl = process.env.API_BASE_URL;
        this.client = supertest(baseUrl);
    }

    create(payload, token) {
        const client = this.client
            .post(this.resource)
            .set('Authorization', token)
            .send(payload);
        return client;
    }

    getAll(token) {
        const client = this.client
            .get(this.resource)
            .set('Authorization', token);
        return client;
    }

    getById(id, token) {
        const client = this.client
            .get(`${this.resource}/${id}`)
            .set('Authorization', token);
        return client;
    }

    update(id, payload, token) {
        const client = this.client
            .put(`${this.resource}/${id}`)
            .set('Authorization', token)
            .send(payload);
        return client;
    }

    delete(id, token) {
        const client = this.client
            .delete(`${this.resource}/${id}`)
            .set('Authorization', token);
        return client;
    }
}
