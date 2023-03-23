import { randomUUID } from 'node:crypto'
import http from 'node:http'

import { createOrder } from './create-order.js'
import { listOrders } from './list-orders.js'
import { OrdersRepository } from './repositories/orders-repository.js'

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/orders') {
    const ordersRepository = new OrdersRepository()

    const order = await createOrder({
      customerId: randomUUID(),
      amount: Math.round(Math.random() * 5000),
    }, ordersRepository)

    return res
      .writeHead(201, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(order))
  }

  if (req.method === 'GET' && req.url === '/orders') {
    const ordersRepository = new OrdersRepository()

    const orders = await listOrders(ordersRepository)

    return res
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(orders))
  }

  return res.writeHead(404).end()
})

server
  .listen(3333)
  .once('listening', () => {
    console.log('HTTP server running!')
  })