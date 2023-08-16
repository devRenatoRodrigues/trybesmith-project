import { expect } from 'chai';
import sinon from 'sinon';
import orderModel from '../../../src/database/models/order.model'
import orderService from '../../../src/services/orders.service'
import orderMock from '../../mocks/order.mock'

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('when findAll orders', function () {

    it('product created successfully', async function () {
     const orders = orderMock.getAllOrdersDatabase
      .map(order => orderModel.build(order))
    // orderModel.build(orderMock.getAllOrdersDatabase)  
      sinon.stub(orderModel, 'findAll').resolves(orders);


      const serviceResponse = await orderService.getOrders()

      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      // expect(serviceResponse.data).to.deep.eq(orderMock.getAllOrdersReturn);
    });
});

});
