import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../model/UserModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel.prototype, "findOne")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      });
  });

  after(() => {
    (UserModel.prototype.findOne as sinon.SinonStub).restore();
  });

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Rota POST', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    expect(result.status).to.be.equal(200);  
    expect(result.body).to.have.property('token');
  });
});
