import { Express } from 'express';
import request from 'supertest';
import initApp from '../../src/app'; '../../src/app';
import { AppDataSource } from '../../src/typeorm-data-source';
import assert from 'assert';

describe('E2E Test', () => {
  let app: Express;
  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async() => {
    // Destroy TypeORM DataSource
    await AppDataSource.destroy();
  });

  describe('HelloWorldController', () => {
    it('GET /', () => {
      return request(app)
        .get('/')
        .expect(200)
        .expect('"Hello world!"');
    });
  });

  describe('UserController', () => {
    it('GET /users/', () => {
      return request(app)
        .get('/users/')
        .expect(200);
    });

    it('GET /users/:id', () => {
      return request(app)
        .get('/users/123123123')
        .expect(404);
    });

    it('POST /users/', () => {
      const body = {
        nickname: 'Jester',
        email: 'jester@test.com'
      };
      return request(app)
        .post('/users/')
        .send(body)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.nickname, body.nickname);
          assert(res.body.email, body.email);
         });
    });
  });
});
