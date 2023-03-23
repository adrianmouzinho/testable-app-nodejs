import { test, mock } from 'node:test'
import assert from 'node:assert'

import { createOrder } from './create-order.js'
import { listOrders } from './list-orders.js'
import { transport } from './mail/transport.js'
import { InMemoryOrdersRepository } from './test/in-memory-orders-repository.js'

mock.method(transport, 'sendMail', () => {
  console.log('Enviou e-mail')
})

test('list created orders', async () => {
  const ordersRepository = new InMemoryOrdersRepository()

  await createOrder({
    customerId: 'customer-id-1',
    amount: 1000,
  }, ordersRepository)

  await createOrder({
    customerId: 'customer-id-2',
    amount: 4000,
  }, ordersRepository)

  const orders = await listOrders(ordersRepository)

  console.log(ordersRepository.items)

  assert.equal(orders.length, 2)
  assert.equal(ordersRepository.items[0].customer_id, 'customer-id-1')
})
