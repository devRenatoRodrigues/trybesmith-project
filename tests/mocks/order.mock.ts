import { Order } from "../../src/types/Order"

const getAllOrdersDatabase: Order[] = [
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
  ]

  const getAllOrdersReturn = [
    {
      id: 1,
      userId: 1,
      productIds:[1]
    },
  ]

export default {
  getAllOrdersDatabase,
  getAllOrdersReturn
}