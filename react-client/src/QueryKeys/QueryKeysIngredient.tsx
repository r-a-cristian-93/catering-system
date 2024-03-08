export const QueryKeysIngredient = {
    ingredientById: (ingredientId: number) => [ "ingredient", ingredientId ] as const,
    priceHistoryByIngredientId: (ingredientId: number) => [ "priceHistory", ingredientId ] as const,
	all: [ 'ingredients' ] as const,
}