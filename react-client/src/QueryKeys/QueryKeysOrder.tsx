export const QueryKeysOrder = {
    orderById: (orderId: number) => [ "order", orderId ] as const,
    itemsByOrderId: (orderId: number) => [ "orderItems", orderId ] as const
}