package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.CategoryModel;
import com.catering.rest.db.models.IngredientModel;
import com.catering.rest.db.models.RecipeModel;
import com.catering.rest.db.models.RecipesDetailsModel;
import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.repositories.IngredientsRepository;
import com.catering.rest.db.repositories.RecipesDetailsRepository;
import com.catering.rest.db.repositories.RecipesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipesService {
    @Autowired
    private final RecipesRepository recipesRepo;
    @Autowired
	private final RecipesDetailsRepository detailsRepo;
    @Autowired
	private final IngredientsRepository ingredientsRepo;

	public Iterable<RecipeModel> getRecipes() {
		return recipesRepo.findAll();
	}

	public RecipeModel addRecipe(RecipeModel recipe) {
		return recipesRepo.save(recipe);
	}

	public RecipeModel getRecipe(Integer id) {
		return recipesRepo.findById(id).get();
	}

	public void deleteRecipe(Integer id) {
		recipesRepo.deleteById(id);
	}

	public RecipeModel updateRecipe(Integer id, RecipeModel recipe) {
		String name = recipe.getName();
		Double quantity = recipe.getQuantity();
		UnitModel unit = recipe.getUnit();
		CategoryModel category = recipe.getCategory();
		recipe = recipesRepo.findById(id).get();

		if(name!=null) {
			recipe.setName(name);
		}
		if(quantity!=null) {
			recipe.setQuantity(quantity);
		}
		if(unit!=null) {
			recipe.setUnit(unit);
		}
		if (category!=null) {
			recipe.setCategory(category);
		}
		return recipesRepo.save(recipe);
	}


	// PAGEABLE

	public Page<RecipeModel> getRecipesPageable(Integer page, Integer size) {
		return recipesRepo.findAll(PageRequest.of(page, size));
	}


	//RECIPE DETAILS

	public List<RecipesDetailsModel> getDetails(Integer recipeId) {
		return detailsRepo.findByRecipeId(recipeId);
	}

	public RecipesDetailsModel addDetails(Integer recipeId, RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(recipeId).get();
		IngredientModel ingredient = ingredientsRepo.findById(details.getIngredient().getId()).get();
		details.setRecipeId(recipe.getId());
		details.setIngredient(ingredient);
		return detailsRepo.save(details);
	}

	public boolean deleteDetails(Integer detailsId) {
		detailsRepo.deleteById(detailsId);

		return true;
	}

	public RecipesDetailsModel updateDetailsQuantity(Integer id, RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		Integer ingredientId = details.getIngredient().getId();
		IngredientModel ingredient = ingredientsRepo.findById(ingredientId).get();
		Double quantity = details.getQuantity();

		details = detailsRepo.findByRecipeIdAndIngredient(recipe.getId(), ingredient);
		details.setQuantity(quantity);
		return detailsRepo.save(details);
	}
}
