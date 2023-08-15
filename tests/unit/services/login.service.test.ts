// import { expect } from 'chai';
// import sinon from 'sinon';
// import loginService from '../../../src/services/login.service'

// describe('LoginService', function () {
//   beforeEach(function () { sinon.restore(); });

// });

// describe('Login Route Tests', function () {
//   it('when not sending email returns an error', async function () {
//     // Arrange
//     // Act
//     const serviceResponse = await loginService.verifyLogin()
//     // Assert
//     expect(serviceResponse.status).to.eq('INVALID_DATA');
//     expect(serviceResponse.data).not.to.have.key('token');
//     expect(serviceResponse.data).to.deep.eq({ message: 'Dados inválidos' });
//   });