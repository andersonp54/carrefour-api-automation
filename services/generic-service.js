import supertest from 'supertest';
import { loadEnv } from './env.js';
import { limiter } from '../helpers/utils.js';
import { schedule } from '../helpers/utils.js';


loadEnv();


export default class GenericService {
    constructor(resource) {
        this.resource = resource;
        const baseUrl = process.env.API_BASE_URL;
        this.client = supertest(baseUrl);
    }

    /**
     * Chamada de scheduler para limitar requests
     * */
    async schedule(reqBuilderFn) {
        return schedule(() => reqBuilderFn());
    }

    create(payload, token) {
        return this.schedule(() => this.client
            .post(this.resource)
            .set('Authorization', token)
            .send(payload)
        );
    }

    getAll(token) {
        return this.schedule(() => this.client
            .get(this.resource)
            .set('Authorization', token)
        );
    }

    getById(id, token) {
        return this.schedule(() => this.client
            .get(`${this.resource}/${id}`)
            .set('Authorization', token)
        );
    }

    update(id, payload, token) {
        return this.schedule(() => this.client
            .put(`${this.resource}/${id}`)
            .set('Authorization', token)
            .send(payload)
        );
    }

    delete(id, token) {
        return this.schedule(() => this.client
            .delete(`${this.resource}/${id}`)
            .set('Authorization', token)
        );
    }
}
