import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app'

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('when passing a empty username', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send(loginMock.emptyUsernameBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal(loginMock.messageEmptyLoginOrPassword);
  });

  it('when passing a empty password', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send(loginMock.emptyUsernameBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal(loginMock.messageEmptyLoginOrPassword);
  });

});
