import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchModel from '../model/MatchModel';
import UserModel from '../model/UserModel';
import TeamModel from '../model/TeamModel';

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
  homeTeam: 3,
  awayTeam: 5,
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};

const CREATE_MATCH_TEAMS_EQUAL = {
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 1,
  awayTeamGoals: 1,
};

const CREATE_MATCH_TEAM_DONT_EXIST = {
  homeTeam: 1,
  awayTeam: 99999,
  homeTeamGoals: 1,
  awayTeamGoals: 1,
};

const NEW_MATCH = {
  id: 3,
  homeTeam: 3,
  awayTeam: 5,
  homeTeamGoals: 3,
  awayTeamGoals: 1,
  inProgress: true
};

const ADMIN_USER = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const UPDATE_MATCH = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
};

const TEAM_BOTAFOGO = { id: 3, teamName: "Botafogo" };
const TEAM_CRUZEIRO = { id: 5, teamName: "Cruzeiro" };

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
      const ARRAY_MATCHES_TRUE = ARRAY_MATCHES.filter((match) => match.inProgress === true);
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
      const ARRAY_MATCHES_FALSE = ARRAY_MATCHES.filter((match) => match.inProgress === false);
      const result = await chai.request(app).get('/matches?inProgress=false');
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(ARRAY_MATCHES_FALSE);
      expect(result.body).to.be.an('array');
      expect(result.body).to.have.length(ARRAY_MATCHES_FALSE.length);
    });
  });

  describe('Rota POST /', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
      sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER);
      // Utilização de diferentes resolves utilizando OnFirstCall e onSecondCall
      // proveniente de uma resolução presente no site TabNine
      // source: https://www.tabnine.com/code/javascript/functions/sinon/SinonStub/onFirstCall
      sinon.stub(TeamModel.prototype, 'findByPk')
        .onFirstCall()
        .resolves(TEAM_BOTAFOGO)
        .onSecondCall()
        .resolves(TEAM_CRUZEIRO);
      sinon.stub(MatchModel.prototype, "create").resolves(NEW_MATCH);
    });
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (UserModel.prototype.findOne as sinon.SinonStub).restore();
      (TeamModel.prototype.findByPk as sinon.SinonStub).restore();
      (MatchModel.prototype.create as sinon.SinonStub).restore();
    });

    it('Caso de sucesso', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';
      const result = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send(CREATE_MATCH);

      expect(result.status).to.be.equal(201);
      expect(result.body).to.deep.equal(NEW_MATCH);
    });
  });

  describe('Rota POST /', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
      sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER);
    });
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (UserModel.prototype.findOne as sinon.SinonStub).restore();
    });

    it('Caso de falha - Times iguais', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';
      const result = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send(CREATE_MATCH_TEAMS_EQUAL);
      
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.an('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    });
  });

  describe('Rota POST /', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ success: 'Token is valid' });
      });
      sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER);
      sinon.stub(TeamModel.prototype, 'findByPk')
        .onFirstCall()
        .resolves(TEAM_BOTAFOGO)
        .onSecondCall()
        .resolves(null);
    });
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (UserModel.prototype.findOne as sinon.SinonStub).restore();
      (TeamModel.prototype.findByPk as sinon.SinonStub).restore();

    });

    it('Caso de falha - Time não existente', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';
      const result = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send(CREATE_MATCH_TEAM_DONT_EXIST);
      
      expect(result.status).to.be.equal(404);
      expect(result.body).to.be.an('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('There is no team with such id!');
    });
  });

  describe('Rota POST /', () => {
    it('Caso de falha - Token Inválido', async () => {
      const token = 'invalid_token';
      const result = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send(CREATE_MATCH);
      
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.an('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Token must be a valid token');
    });
  });


  describe('Rota POST /', () => {
    before(async () => {
      sinon.stub(MatchModel.prototype, 'findByPk').resolves(ARRAY_MATCHES[0]);
      sinon.stub(MatchModel.prototype, 'updateFinish').resolves();
    });
    after(() => {
      (MatchModel.prototype.findByPk as sinon.SinonStub).restore();
      (MatchModel.prototype.updateFinish as sinon.SinonStub).restore();
    });

    it('Caso de sucesso', async () => {
      const result = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.an('object');
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Finished');
    });
  });

  describe('Rota POST /', () => {
    before(async () => {
      sinon.stub(MatchModel.prototype, 'findByPk').resolves(ARRAY_MATCHES[0]);
      sinon.stub(MatchModel.prototype, 'updateMatches').resolves();
    });
    after(() => {
      (MatchModel.prototype.findByPk as sinon.SinonStub).restore();
      (MatchModel.prototype.updateMatches as sinon.SinonStub).restore();
    });

    it('Caso de sucesso', async () => {
      const result = await chai
        .request(app)
        .patch('/matches/1')
        .send(UPDATE_MATCH);
      
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(UPDATE_MATCH);
    });
  });
  
});
