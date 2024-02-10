export const QueryKeysAddress = {
    all: [ "addresses" ] as const,
    byClientId: (clientId: number | null) => [ "addresses", clientId ] as const,
}