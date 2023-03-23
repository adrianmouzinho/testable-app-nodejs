import { test, mock } from 'node:test'
import assert from 'node:assert'

import { createOrder } from './create-order.js'
import { transport } from './mail/transport.js'
import { InMemoryOrdersRepository } from './test/in-memory-orders-repository.js'

mock.method(transport, 'sendMail', () => {
  console.log('Enviou e-mail')
})

test('create new order', async () => {
  const ordersRepository = new InMemoryOrdersRepository()

  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 1000,
  }, ordersRepository)

  assert.ok(order.id)
  assert.equal(ordersRepository.items[0].amount, 1000)
})

test('orders with an amount higher than 3000 should be marked as priority', async () => {
  const ordersRepository = new InMemoryOrdersRepository()

  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 4000,
  }, ordersRepository)

  assert.equal(order.priority, true)
})

test('orders with an amount lower than 3000 should not be marked as priority', async () => {
  const ordersRepository = new InMemoryOrdersRepository()
  
  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 1000,
  }, ordersRepository)

  assert.equal(order.priority, false)
})