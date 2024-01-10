export const QueryKeysOrder = {
    byId: (orderId: number) => [ "order", orderId ] as const,
}