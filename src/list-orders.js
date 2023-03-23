export async function listOrders(ordersRepository) {
  const orders = await ordersRepository.list()

  return orders
}