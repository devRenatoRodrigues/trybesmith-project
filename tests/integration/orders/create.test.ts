import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import orderMock from '../../mocks/order.mock';

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

  it('create new order successfuly ', async () => {
    const response = await chai
      .request(app)
      .post('/orders')
      .set('Authorization', orderMock.validHeaderToken)
      .send(orderMock.validBodyCreate);
      

    expect(response.status).to.equal(201);
    expect(response.body).to.be.deep.equal({
      userId: 1,
      productIds: [
        1,
        2
      ]
    });
  });



});
