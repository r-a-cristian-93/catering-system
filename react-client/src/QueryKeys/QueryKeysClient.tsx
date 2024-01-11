export const QueryKeysClient = {
    all: [ "clients" ] as const,
    page: (pageNumber: number) => ["clients", pageNumber] as const,
}