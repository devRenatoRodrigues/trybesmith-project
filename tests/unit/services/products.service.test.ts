import { expect } from 'chai';
import sinon from 'sinon';

import productService from '../../../src/services/products.service'
import productMock from '../../mocks/product.mock'
import ProductModel from '../../../src/database/models/product.model';

describe('#ProductsServices', function () {
  beforeEach(function () { sinon.restore(); });

  describe('when creating a product', function () {

    it('product created successfully', async function () {
      sinon.stub(ProductModel, 'create')
      .resolves(ProductModel.build(productMock.simulatedProductCreated));

      const serviceResponse = await productService.create(productMock.validProductBody)

      expect(serviceResponse.status).to.eq('CREATED');
      expect(serviceResponse.data).to.deep.eq(productMock.simulatedProductCreated);
    });
});

describe('when findAll products', function () {
    
  it('get all products successfully', async function () {
    const products = productMock.getAllProductsReturn
    .map((product) => ProductModel.build(product))
    sinon.stub(ProductModel, 'findAll')
    .resolves(products);

    const serviceResponse = await productService.getProduct();

    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.eq(productMock.getAllProductsReturn);
  });
})

});
