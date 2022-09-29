import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../model/UserModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const VALID_USER = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};

describe('Rota /login', () => {
  describe('Rota POST /', () => {
    before(async () => sinon.stub(UserModel.prototype, "findOne").resolves(VALID_USER));
    after(() => (UserModel.prototype.findOne as sinon.SinonStub).restore());
  
    it('Caso de sucesso', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(result.status).to.be.equal(200);  
      expect(result.body).to.have.property('token');
    });
  });

  describe('Rota POST /', () => {
    it('Caso de falha - Campo email vazio', async () => {
      const result = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_admin'
      });
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('All fields must be filled');
    });

    it('Caso de falha - Campo email inválido', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'emailErrado',
        password: 'secret_admin'
      });
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    });

    it('Caso de falha - Campo password inválido', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: '123'
      });
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('All fields must be filled');
    });

  });

  describe('Rota POST /', () => {
    before(async () => sinon.stub(UserModel.prototype, "findOne").resolves(null));
    after(() => (UserModel.prototype.findOne as sinon.SinonStub).restore());
  
    it('Caso de falha - Usuário não existente', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin2@admin.com',
        password: 'secret_admin'
      });
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Rota POST /', () => {
    before(async () => sinon.stub(UserModel.prototype, "findOne").resolves(VALID_USER));
    after(() => (UserModel.prototype.findOne as sinon.SinonStub).restore());
  
    it('Caso de falha - Password errado', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin2'
      });
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    });
  });


  describe('Rota GET /validate', () => {
    before(async () => sinon.stub(UserModel.prototype, "findOne").resolves(VALID_USER));
    after(() => (UserModel.prototype.findOne as sinon.SinonStub).restore());

    it('Caso de sucesso', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(result.status).to.be.equal(200);  
      expect(result.body).to.have.property('token');
    });
  });
});
