import { expect } from 'chai';
import sinon from 'sinon';

import productService from '../../../src/services/products.service'
import productMock from '../../mocks/product.mock'
import ProductModel from '../../../src/database/models/product.model';

describe('#ProductsServiceCreate', function () {
  beforeEach(function () { sinon.restore(); });

  describe('when creating a product', function () {
    it('product created successfully', async function () {
      const createStub = sinon.stub(ProductModel, 'create');

      createStub.resolves(ProductModel.build(productMock.simulatedProductCreated));

      const serviceResponse = await productService.create(productMock.validProductBody)

      expect(serviceResponse.status).to.eq('CREATED');
      expect(serviceResponse.data).to.deep.eq(productMock.simulatedProductCreated);
    });
});
});
