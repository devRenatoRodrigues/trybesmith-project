const getAllOrdersDatabase =  [
  {
    dataValues: {
      id: 1,
      userId: 1,
      productIds: [{ id: 2 }]
    },
    productIds: [{ id: 2 }]
  }
];

const getAllOrdersDatabaseWithoutProduct =  [
  {
    dataValues: {
      id: 1,
      userId: 1,
    },
  }
];

  const productOrder = [{
    id: 1,
    name: "Excalibur",
    price: "10 peças de ouro",
    orderId: 1
  }]

  const getAllOrdersReturn = [
    {
      id: 1,
      userId: 1,
      productIds:[2]
    },
  ]

  const getAllOrdersReturnWithoutProduct = [
    {
      id: 1,
      userId: 1,
      productIds: [],
    },
  ]

  const validHeaderToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MjI4MjIyOX0.dyAc4A7xO8tOKhmkjFJAcG-NL5ezwLKb4lyvuiyiwfs'
  const invalidTokenHeader = "invalid_token"

  const validBodyCreate ={
    userId: 1,
    productIds: [1,2]
  }

  const BodyWithoutUserIdCreate = {
    productIds: [1, 2]
  }

  const BodyWithoutProductIdsCreate = {
    userId: 2,
  }

  const bodyWithEmptyArray = {
    userId: 2,
    productIds: []
  }

  const bodyWithInvalidProductIds = {
    userId: 2,
    productIds: 13
  }

  const bodyWithInvalidUserId = {
    userId: '13',
    productIds: [1,5]
  }

  const createProductReturn = {dataValues: { id: 7, userId: 1 }}

  const updateProductReturn = [ [ 1 ], [ 1 ] ]


export default {
  getAllOrdersDatabase,
  getAllOrdersReturn,
  validBodyCreate,
  validHeaderToken,
  invalidTokenHeader,
  BodyWithoutUserIdCreate,
  BodyWithoutProductIdsCreate,
  bodyWithEmptyArray,
  bodyWithInvalidProductIds,
  bodyWithInvalidUserId,
  productOrder,
  getAllOrdersDatabaseWithoutProduct,
  getAllOrdersReturnWithoutProduct,
  createProductReturn,
  updateProductReturn
}