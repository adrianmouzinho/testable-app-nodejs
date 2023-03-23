import { randomUUID } from 'node:crypto'

import { client } from '../database/client.js'

export class OrdersRepository {
  async create (data) {
    const { customerId, isPriority, amount } = data

    const command = await client.query(`
      INSERT INTO "orders" (id, customer_id, priority, amount)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [
      randomUUID(),
      customerId,
      isPriority,
      amount,
    ])

    const order = command.rows[0]

    return order
  }

  async list () {
    const command = await client.query(`
      SELECT * FROM "orders"
    `)

    const orders = command.rows

    return orders
  }
}