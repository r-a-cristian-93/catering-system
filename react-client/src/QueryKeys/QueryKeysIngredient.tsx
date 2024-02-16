export const QueryKeysIngredient = {
    ingredientById: (ingredientId: number) => [ "ingredient", ingredientId ] as const,
	all: [ 'ingredients' ] as const,
}