import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../model/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

const ADMIN_USER_OBJECT = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const NOT_ADMIN_USER_OBJECT = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';

describe('Rota /login', () => {
  describe('Rota POST /', () => {
    before(async () => sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER_OBJECT));
    after(() => (UserModel.prototype.findOne as sinon.SinonStub).restore());

    it('Caso de sucesso', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('token');
    });
  });

  describe('Rota POST /', () => {
    it('Caso de falha - Campo email vazio', async () => {
      const result = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_admin',
      });
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('All fields must be filled');
    });

    it('Caso de falha - Campo email inválido', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'emailErrado',
        password: 'secret_admin',
      });
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    });

    it('Caso de falha - Campo password inválido', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'abc',
      });
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Rota POST /', () => {
    before(async () => sinon.stub(UserModel.prototype, 'findOne').resolves(null));
    after(() => (UserModel.prototype.findOne as sinon.SinonStub).restore());

    it('Caso de falha - Usuário não existente', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin2@admin.com',
        password: 'secret_admin',
      });
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Rota POST /', () => {
    before(async () => sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER_OBJECT));
    after(() => (UserModel.prototype.findOne as sinon.SinonStub).restore());

    it('Caso de falha - Password errado', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'not_secret_admin',
      });
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Rota GET /validate', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
      sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER_OBJECT);
    });
    after(() => {
      (UserModel.prototype.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/login/validate').set('authorization', VALID_TOKEN);
      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('role');
      expect(result.body.role).to.be.equal('admin');
    });
  });

  describe('Rota GET /validate', () => {
    before(async () => {
      // Implementação do stub na biblioteca jwt baseada na resolução presente no ITecNote
      // source: https://itecnote.com/tecnote/javascript-writing-unit-tests-for-method-that-uses-jwt-token-in-javascript/
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
      sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER_OBJECT);
    });
    after(() => {
      (UserModel.prototype.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Caso de usuário ADMIN', async () => {
      // Requisição com autentificação proveniente da documentação e aula do Especialista Lucas Henrique de Abreu
      // source: https://www.chaijs.com/plugins/chai-http/
      const result = await chai.request(app).get('/login/validate').set('authorization', VALID_TOKEN);
      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('role');
      expect(result.body.role).to.be.equal('admin');
    });
  });

  describe('Rota GET /validate', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
      sinon.stub(UserModel.prototype, 'findOne').resolves(NOT_ADMIN_USER_OBJECT);
    });
    after(() => {
      (UserModel.prototype.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Caso de usuário que não é o ADMIN', async () => {
      const result = await chai.request(app).get('/login/validate').set('authorization', VALID_TOKEN);
      expect(result.status).to.be.equal(401);
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('User not Admin');
    });
  });
});
