import { transport } from './mail/transport.js'

export async function createOrder(data, ordersRepository) {
  const { customerId, amount } = data

  const isPriority = amount > 3000
  
  const order = await ordersRepository.create({
    customerId,
    isPriority,
    amount,
  })

  const amountFormatted = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' }
  ).format(amount)

  await transport.sendMail({
    from: {
      name: 'Adrian Mouzinho',
      address: 'adrian@email.com',
    },
    to: {
      name: 'Adrian Mouzinho',
      address: 'adrian@email.com',
    },
    subject: `New order #${order.id}`,
    html: `<strong>New order:</strong> ${order.id} with amount of ${amountFormatted}`
  })

  return order
}