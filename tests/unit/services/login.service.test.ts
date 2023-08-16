import { expect } from 'chai';
import sinon from 'sinon';
import loginService from '../../../src/services/login.service'
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  
  describe('Login Route Tests', function () {
  it('when passing an invalid password', async function () {
    const userBody = UserModel.build(loginMock.existingUserWithHash)
    sinon.stub(UserModel, 'findOne').resolves(userBody)

    const serviceResponse = await loginService.verifyLogin(loginMock.invalidPasswordBody)
    expect(serviceResponse.status).to.eq('UNAUTHORIZED');
    expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });
  });

  it('when passing an invalid username', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null)

    const serviceResponse = await loginService.verifyLogin(loginMock.invalidUsernameBody)
   
    expect(serviceResponse.status).to.eq('UNAUTHORIZED');
    expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });
  });

  it('when passing an valid body', async function () {
    const userBody = UserModel.build(loginMock.existingUserWithHash)
    sinon.stub(UserModel, 'findOne').resolves(userBody)

    const serviceResponse = await loginService.verifyLogin(loginMock.validLoginBody)
    
    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.have.key('token');
  });

})
});