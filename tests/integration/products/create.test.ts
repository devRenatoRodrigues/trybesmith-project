import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import productMock from '../../mocks/product.mock'
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('when passing a name less than 3 characters', async () => {
    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.invalidNameProductBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({
      message: "\"name\" length must be at least 3 characters long"
    });
  });

  it('when price not a string', async () => {
    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.invalidPriceProductBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal(
      {message: "\"price\" must be a string"}
    );
  });

  it('when name not a string', async () => {
    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.nameNumberBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal(
      {message: "\"name\" must be a string"}
    );
  });

  it('when passing a body without name', async () => {
    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.bodyWithoutName);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal(
      {
        message: "\"name\" is required"
      }
    );
  });

  it('when passing a body without price', async () => {
    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.bodyWithoutPrice);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal(
      {
        message: "\"price\" is required"
      }
    );
  });


  it('when passing a price less than 3 characters', async () => {
    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.invalidLengthProductPrice);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal(
        {
          message: "\"price\" length must be at least 3 characters long"
        }
    );
  });

  it('when passing a valid product body', async () => {
    sinon.stub(ProductModel, 'create')
      .resolves(ProductModel.build(productMock.simulatedProductCreated));

    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.validProductBody);

    expect(response.status).to.equal(201);
    expect(response.body).to.be.deep.equal(
      {
        id: 6,
        name: "konoha headband",
        price: "10 ryō"
      }
    );
  });
});
