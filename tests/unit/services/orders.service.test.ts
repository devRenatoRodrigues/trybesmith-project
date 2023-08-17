import { expect } from 'chai';
import sinon from 'sinon';
import orderModel from '../../../src/database/models/order.model'
import orderService from '../../../src/services/orders.service'
import orderMock from '../../mocks/order.mock'
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('when findAll orders', function () {

    it('find all orders when product id exists', async function () {
      sinon.stub(orderModel, 'findAll').resolves(orderMock.getAllOrdersDatabase as any);
      sinon.stub(ProductModel, 'findAll').resolves(orderMock.getAllOrdersDatabase[0].productIds as any);

      const serviceResponse = await orderService.getOrders()

      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.be.an('array');
      expect(serviceResponse.data).to.deep.eq(orderMock.getAllOrdersReturn);
    });
    });
    it('find all orders when product id is empty', async function () {
        sinon.stub(orderModel, 'findAll').resolves(orderMock.getAllOrdersDatabaseWithoutProduct as any);
  
        const serviceResponse = await orderService.getOrders()
      
        expect(serviceResponse.status).to.eq('SUCCESSFUL');
        expect(serviceResponse.data).to.be.an('array');
        expect(serviceResponse.data).to.deep.eq(orderMock.getAllOrdersReturnWithoutProduct);
  
      });
      });
  

