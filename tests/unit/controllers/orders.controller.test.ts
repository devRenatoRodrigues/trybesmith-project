import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderController from '../../../src/controllers/orders.controller'
import ordersService from '../../../src/services/orders.service';
import orderMock from '../../mocks/order.mock';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('when findAll orders', function () {
    it('findAll orders successfully', async function () {
      const serviceResponse = orderMock.getAllOrdersReturn
      sinon.stub(ordersService, 'getOrders')
      .resolves({
        status: 'SUCCESSFUL',
        data: serviceResponse
      })
      
      await orderController.getOrdes(req, res)
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(orderMock.getAllOrdersReturn);
    });
});

});
