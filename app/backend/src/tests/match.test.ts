import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchModel from '../model/MatchModel';
import UserModel from '../model/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

const ARRAY_MATCHES = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: { id: 16, teamName: "São Paulo" },
    teamAway: { id: 8, teamName: "Grêmio" },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { id: 9, teamName: "Internacional" },
    teamAway: { id: 14, teamName: "Santos" },
  },
];

const CREATE_MATCH = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const NEW_MATCH = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

const ADMIN_USER = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

describe('Rota /matches', () => {

  describe('Rota GET /', () => {
    before(async () => sinon.stub(MatchModel.prototype, "findAll").resolves(ARRAY_MATCHES));
    after(() => (MatchModel.prototype.findAll as sinon.SinonStub).restore());
  
    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/matches');
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(ARRAY_MATCHES);
      expect(result.body).to.be.an('array');
      expect(result.body).to.have.length(ARRAY_MATCHES.length);

    });
  });

  describe('Rota GET /', () => {
    before(async () => sinon.stub(MatchModel.prototype, "findAll").resolves(null));
    after(() => (MatchModel.prototype.findAll as sinon.SinonStub).restore());
  
    it('Caso de falha', async () => {
      const result = await chai.request(app).get('/matches');
      
      expect(result.status).to.be.equal(404);
      expect(result.body).to.be.an('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Not found any matches');

    });
  });

  describe('Rota GET /matches?inProgress=true', () => {
    before(async () => sinon.stub(MatchModel.prototype, "findAll").resolves(ARRAY_MATCHES));
    after(() => (MatchModel.prototype.findAll as sinon.SinonStub).restore());
  
    it('Caso de sucesso', async () => {
      const ARRAY_MATCHES_TRUE = ARRAY_MATCHES.filter((match) => match.inProgress === true)
      const result = await chai.request(app).get('/matches?inProgress=true');
     
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(ARRAY_MATCHES_TRUE);
      expect(result.body).to.be.an('array');
      expect(result.body).to.have.length(ARRAY_MATCHES_TRUE.length);

    });
  });

  describe('Rota GET /matches?inProgress=false', () => {
    before(async () => sinon.stub(MatchModel.prototype, "findAll").resolves(ARRAY_MATCHES));
    after(() => (MatchModel.prototype.findAll as sinon.SinonStub).restore());
  
    it('Caso de sucesso', async () => {
      const ARRAY_MATCHES_FALSE = ARRAY_MATCHES.filter((match) => match.inProgress === false)
      const result = await chai.request(app).get('/matches?inProgress=false');
     
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(ARRAY_MATCHES_FALSE);
      expect(result.body).to.be.an('array');
      expect(result.body).to.have.length(ARRAY_MATCHES_FALSE.length);

    });
  });

  // describe('Rota POST /', () => {
 
  //   before(async () => {
  //     sinon.stub(jwt, 'verify').callsFake(() => {
  //       return Promise.resolve({ success: 'Token is valid' });
  //     });
  //     sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER);
  //     sinon.stub(MatchModel.prototype, "create").resolves(NEW_MATCH);
  //   });
  //   after(() => {
  //     (MatchModel.prototype.create as sinon.SinonStub).restore();
  //     (UserModel.prototype.findOne as sinon.SinonStub).restore();
  //     (jwt.verify as sinon.SinonStub).restore();
  //   });

  //   it('Caso de sucesso', async () => {
  //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';
  //     const result = await chai
  //       .request(app)
  //       .post('/matches')
  //       .send(CREATE_MATCH)
  //       .set('authorization', token);

  //     console.log(result.status, result.body);
      
  //     expect(result.status).to.be.equal(200);
  //     expect(result.body).to.deep.equal(ARRAY_MATCHES);
  //     expect(result.body).to.be.an('array');
  //     expect(result.body).to.have.length(ARRAY_MATCHES.length);

  //   });
  // });
  
});
