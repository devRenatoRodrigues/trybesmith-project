const getAllOrdersDatabase = [
    {
      id: 1,
      userId: 1,
      productIds:[ {
        id: 1,
        name: "Excalibur",
        price: "10 peças de ouro",
        orderId: 1
      },]
    },
    {
      id: 2,
      userId: 3,
      productIds: [{
        id: 4,
        name: "Armadura de Aquiles",
        price: "1 peça de ouro",
        orderId: 2
      },]
    },
    {
      id: 3,
      userId: 2,
      productIds: [
        {
          id: 5,
          name: "Harpa de Dagda",
          price: "15 peças de ouro",
          orderId: 3
        }
      ]
    }
  ]

  const getAllOrdersReturn = [
    {
      id: 1,
      userId: 1,
      productIds:[1]
    },
    {
      id: 2,
      userId: 3,
      productIds: [4]
    },
    {
      id: 3,
      userId: 2,
      productIds: [5]
    }
  ]

export default {
  getAllOrdersDatabase,
  getAllOrdersReturn
}