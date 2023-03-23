import { randomUUID } from 'node:crypto'

export class InMemoryOrdersRepository {
  items = []

  async create (data) {
    const { customerId, isPriority, amount } = data

    const order = {
      id: randomUUID(),
      customer_id: customerId,
      priority: isPriority,
      amount,
    }

    this.items.push(order)

    return order
  }

  async list () {
    return this.items
  }
}