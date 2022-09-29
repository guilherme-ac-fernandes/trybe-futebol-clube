import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../model/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /teams', () => {

  describe('Rota GET /', () => {
    before(async () => {
      sinon
        .stub(TeamModel.prototype, "findAll")
        .resolves([
          { id: 1, teamName: 'Botafogo' },
          { id: 2, teamName: 'Corinthians' },
          { id: 3, teamName: 'Cruzeiro' },
        ]);
    });
  
    after(() => {
      (TeamModel.prototype.findAll as sinon.SinonStub).restore();
    });
  
  
    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/teams');
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('array');
      expect(result.body).to.have.length(3);
      expect(result.body[0]).to.have.property('id');
      expect(result.body[0]).to.have.property('teamName');
    });
  });

  describe('Rota GET /', () => {
    before(async () => {
      sinon
        .stub(TeamModel.prototype, "findAll")
        .resolves(null);
    });
  
    after(() => {
      (TeamModel.prototype.findAll as sinon.SinonStub).restore();
    });
  
  
    it('Caso de falha', async () => {
      const result = await chai.request(app).get('/teams');
      expect(result.status).to.be.equal(404);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Not found any team');
    });
  });

  describe('Rota GET /:id', () => {
    before(async () => {
      sinon
        .stub(TeamModel.prototype, "findByPk")
        .resolves({ id: 1, teamName: 'Botafogo' });
    });
  
    after(() => {
      (TeamModel.prototype.findByPk as sinon.SinonStub).restore();
    });
  
  
    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/teams/1');    
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('id');
      expect(result.body).to.have.property('teamName');
    });
  });

  describe('Rota GET /:id', () => {
    before(async () => {
      sinon
        .stub(TeamModel.prototype, "findByPk")
        .resolves(null);
    });
  
    after(() => {
      (TeamModel.prototype.findByPk as sinon.SinonStub).restore();
    });
  
  
    it('Caso de falha', async () => {
      const result = await chai.request(app).get('/teams/1');
      expect(result.status).to.be.equal(404);
      expect(result.body).to.be.a('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Team Not found');
    });
  });
});
