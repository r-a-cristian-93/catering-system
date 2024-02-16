export const QueryKeysRecipe = {
    recipeById: (recipeId: number) => [ "recipe", recipeId ] as const,
    itemsByRecipeId: (recipeId: number) => [ "recipeItems", recipeId ] as const,
	all: [ 'recipes' ] as const,
}