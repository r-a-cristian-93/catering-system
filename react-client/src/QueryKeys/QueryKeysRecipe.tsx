export const QueryKeysRecipe = {
    recipeById: (recipeId: number) => [ "recipe", recipeId ] as const,
	all: [ 'recipes' ] as const,
}