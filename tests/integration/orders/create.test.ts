import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import orderMock from '../../mocks/order.mock';
import jwt from '../../../src/utils/jwt';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('when trying create without token', async () => {
    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', '')
      .send(orderMock.validBodyCreate);
      

    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({
      message: "Token not found"
    });
  });

  it('when trying create with invalid token', async () => {
    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', orderMock.invalidTokenHeader)
      .send(orderMock.validBodyCreate);
      

    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({
      message: "Invalid token"
    });
  });

  it('when trying create order with body without userId ', async () => {
    sinon.stub(jwt, 'verify').resolves(loginMock.validTokenAcess)

    const userExist = UserModel.build(loginMock.existingUserWithHash);
    sinon.stub(UserModel, 'findOne').resolves(userExist)

    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', orderMock.validHeaderToken)
      .send(orderMock.BodyWithoutUserIdCreate);
      

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({
      message: "\"userId\" is required"
    });
  });

  it('when trying create order with body without productsIds ', async () => {
    sinon.stub(jwt, 'verify').resolves(loginMock.validTokenAcess)

    const userExist = UserModel.build(loginMock.existingUserWithHash);
    sinon.stub(UserModel, 'findOne').resolves(userExist)

    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', orderMock.validHeaderToken)
      .send(orderMock.BodyWithoutProductIdsCreate);
      

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({
      message: "\"productIds\" is required"
    });
  });

  it('when trying create order with empty array in productsIds ', async () => {
    sinon.stub(jwt, 'verify').resolves(loginMock.validTokenAcess)

    const userExist = UserModel.build(loginMock.existingUserWithHash);
    sinon.stub(UserModel, 'findOne').resolves(userExist)

    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', orderMock.validHeaderToken)
      .send(orderMock.bodyWithEmptyArray);
      

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({
      message: "\"productIds\" must include only numbers"
    });
  });

  it('when trying to create an order with invalid userId ', async () => {
    sinon.stub(jwt, 'verify').resolves(loginMock.validTokenAcess)

    const userExist = UserModel.build(loginMock.existingUserWithHash);
    sinon.stub(UserModel, 'findOne').resolves(userExist)

    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', orderMock.validHeaderToken)
      .send(orderMock.bodyWithInvalidUserId);
      

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({
      message: "\"userId\" must be a number"
    });
  });

 it('create new order successfully', async () => {
    sinon.stub(jwt, 'verify').resolves(loginMock.validTokenAcess);

    const userExist = UserModel.build(loginMock.existingUserWithHash);
    sinon.stub(UserModel, 'findOne').resolves(userExist);

    sinon.stub(OrderModel, 'create').resolves(orderMock.createProductReturn as any)
    const update = orderMock.updateProductReturn.map((p) => p )
    sinon.stub(ProductModel, 'update').resolves(update as any)

    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', orderMock.validHeaderToken)
      .send(orderMock.validBodyCreate);

    console.log(response);

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({
      userId: 1,
      productIds: [
        1,
        2
      ]
    });
});



});
