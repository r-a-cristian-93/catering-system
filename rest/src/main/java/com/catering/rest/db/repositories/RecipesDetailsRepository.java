package com.catering.rest.db.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catering.rest.db.models.IngredientModel;
import com.catering.rest.db.models.RecipesDetailsModel;

public interface RecipesDetailsRepository extends JpaRepository<RecipesDetailsModel, Integer> {
	List<RecipesDetailsModel> findByRecipeId(Integer recipeId);
	RecipesDetailsModel findByRecipeIdAndIngredient(Integer recipeId, IngredientModel ingredient);
}
