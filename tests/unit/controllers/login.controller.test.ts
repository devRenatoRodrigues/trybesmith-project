import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service'
import loginController from '../../../src/controllers/login.controller'

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('when passing a valid username and password!', async function () {
    req.body = loginMock.validLoginBody
    const serviceResponse = { token: '132588' };
    sinon.stub(loginService, 'verifyLogin').resolves({
      status: 'SUCCESSFUL',
      data: serviceResponse,
    });

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponse);
  });

  it('when passing a invalid password!', async function () {
    req.body = loginMock.invalidPasswordBody
    const serviceResponse = loginMock.messageInvalidLoginOrPassword
    sinon.stub(loginService, 'verifyLogin').resolves({
      status: 'UNAUTHORIZED',
      data: serviceResponse,
    });

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(serviceResponse);
  });

  it('when passing a invalid username!', async function () {
    req.body = loginMock.invalidUsernameBody
    const serviceResponse = loginMock.messageInvalidLoginOrPassword
    sinon.stub(loginService, 'verifyLogin').resolves({
      status: 'UNAUTHORIZED',
      data: serviceResponse,
    });

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(serviceResponse);
  });

});
