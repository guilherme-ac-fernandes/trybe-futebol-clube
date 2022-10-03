import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import LeaderboardModel from '../model/LeaderboardModel';

chai.use(chaiHttp);

const { expect } = chai;

const ARRAY_TEAM_AWAY = [
  {
		id: 14,
		teamName: "Santos",
		matchAway: [
			{
				id: 2,
				homeTeam: 9,
				homeTeamGoals: 1,
				awayTeam: 14,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 24,
				homeTeam: 10,
				homeTeamGoals: 2,
				awayTeam: 14,
				awayTeamGoals: 2,
				inProgress: false
			}
		]
	},
	{
		id: 12,
		teamName: "Palmeiras",
		matchAway: [
			{
				id: 9,
				homeTeam: 1,
				homeTeamGoals: 0,
				awayTeam: 12,
				awayTeamGoals: 3,
				inProgress: false
			},
			{
				id: 30,
				homeTeam: 3,
				homeTeamGoals: 0,
				awayTeam: 12,
				awayTeamGoals: 4,
				inProgress: false
			}
		]
	},
];

const ARRAY_TEAM_HOME = [
  {
		id: 14,
		teamName: "Santos",
		matchHome: [
			{
				id: 14,
				homeTeam: 14,
				homeTeamGoals: 2,
				awayTeam: 16,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 32,
				homeTeam: 14,
				homeTeamGoals: 5,
				awayTeam: 11,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 38,
				homeTeam: 14,
				homeTeamGoals: 2,
				awayTeam: 4,
				awayTeamGoals: 1,
				inProgress: false
			}
		]
	},
	{
		id: 12,
		teamName: "Palmeiras",
		matchHome: [
			{
				id: 7,
				homeTeam: 12,
				homeTeamGoals: 2,
				awayTeam: 6,
				awayTeamGoals: 2,
				inProgress: false
			},
			{
				id: 18,
				homeTeam: 12,
				homeTeamGoals: 4,
				awayTeam: 5,
				awayTeamGoals: 2,
				inProgress: false
			},
			{
				id: 40,
				homeTeam: 12,
				homeTeamGoals: 4,
				awayTeam: 8,
				awayTeamGoals: 1,
				inProgress: false
			}
		]
	},
];

const ARRAY_BOARD_HOME = [
  {
		name: "Santos",
		totalGames: 3,
		goalsFavor: 9,
		goalsOwn: 3,
		goalsBalance: 6,
		totalVictories: 3,
		totalDraws: 0,
		totalLosses: 0,
		totalPoints: 9,
		efficiency: "100.00"
	},
	{
		name: "Palmeiras",
		totalGames: 3,
		goalsFavor: 10,
		goalsOwn: 5,
		goalsBalance: 5,
		totalVictories: 2,
		totalDraws: 1,
		totalLosses: 0,
		totalPoints: 7,
		efficiency: "77.78"
	},
];

const ARRAY_BOARD_AWAY = [
  {
		name: "Palmeiras",
		totalGames: 2,
		goalsFavor: 7,
		goalsOwn: 0,
		goalsBalance: 7,
		totalVictories: 2,
		totalDraws: 0,
		totalLosses: 0,
		totalPoints: 6,
		efficiency: "100.00"
	},
	{
		name: "Santos",
		totalGames: 2,
		goalsFavor: 3,
		goalsOwn: 3,
		goalsBalance: 0,
		totalVictories: 0,
		totalDraws: 2,
		totalLosses: 0,
		totalPoints: 2,
		efficiency: "33.33"
	},
];

const ARRAY_BOARD = [
  {
		name: "Palmeiras",
		totalGames: 5,
		goalsFavor: 17,
		goalsOwn: 5,
		goalsBalance: 12,
		totalVictories: 4,
		totalDraws: 1,
		totalLosses: 0,
		totalPoints: 13,
		efficiency: "86.67"
	},
	{
		name: "Santos",
		totalGames: 5,
		goalsFavor: 12,
		goalsOwn: 6,
		goalsBalance: 6,
		totalVictories: 3,
		totalDraws: 2,
		totalLosses: 0,
		totalPoints: 11,
		efficiency: "73.33"
	},
];

describe('Rota /leaderboard', () => {

  describe('Rota GET /home', () => {
      before(async () => sinon.stub(LeaderboardModel.prototype, "findAllHome").resolves(ARRAY_TEAM_HOME));
      after(() => (LeaderboardModel.prototype.findAllHome as sinon.SinonStub).restore());
  
    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard/home');
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(ARRAY_BOARD_HOME);
      expect(result.body).to.be.an('array');
      expect(result.body).to.have.length(ARRAY_BOARD_HOME.length);
    });
  });

  describe('Rota GET /away', () => {
    before(async () => sinon.stub(LeaderboardModel.prototype, "findAllAway").resolves(ARRAY_TEAM_AWAY));
    after(() => (LeaderboardModel.prototype.findAllAway as sinon.SinonStub).restore());

    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard/away');
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(ARRAY_BOARD_AWAY);
      expect(result.body).to.be.an('array');
      expect(result.body).to.have.length(ARRAY_BOARD_AWAY.length);
    });
  });

  describe('Rota GET /', () => {
    before(async () => {
      sinon.stub(LeaderboardModel.prototype, "findAllHome").resolves(ARRAY_TEAM_HOME);
      sinon.stub(LeaderboardModel.prototype, "findAllAway").resolves(ARRAY_TEAM_AWAY);
    });
    after(() => {
      (LeaderboardModel.prototype.findAllHome as sinon.SinonStub).restore();
      (LeaderboardModel.prototype.findAllAway as sinon.SinonStub).restore();
    });

    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard');
      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(ARRAY_BOARD);
      expect(result.body).to.be.an('array');
      expect(result.body).to.have.length(ARRAY_BOARD.length);
    });
  });
});
