import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import productController from '../../../src/controllers/product.controller'
import productsService from '../../../src/services/products.service';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#ProductsControlllerCreate', function () {
    beforeEach(function () { sinon.restore(); });
  
    describe('when creating a product', function () {
      it('product created successfully', async function () {
        req.body = productMock.validProductBody;
        const serviceResponse = {
          "id": 6,
          "name": "konoha headband",
          "price": "10 ryō"
        }
        sinon.stub(productsService, 'create')
        .resolves({
          status: 'CREATED',
          data: serviceResponse
        })
  
        await productController.create(req, res)
  
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(productMock.simulatedProductCreated);
      });
  });
  });


});
