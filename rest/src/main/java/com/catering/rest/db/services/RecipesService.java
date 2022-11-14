package com.catering.rest.db.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

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
		return recipesRepo.save(recipe);
	}


	// PAGEABLE

	public Page<RecipeModel> getRecipesPageable(Integer page, Integer size) {
		return recipesRepo.findAll(PageRequest.of(page, size));
	}


	//RECIPE DETAILS

	public List<RecipesDetailsModel> getDetails(Integer id) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		return detailsRepo.findByRecipe(recipe);
	}

	public RecipesDetailsModel addDetails(Integer id, RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		IngredientModel ingredient = ingredientsRepo.findById(details.getIngredient().getId()).get();
		details.setRecipe(recipe);
		details.setIngredient(ingredient);
		return detailsRepo.save(details);
	}

	public void deleteDetails(Integer id, RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		Integer ingredientId = details.getIngredient().getId();
		IngredientModel ingredient = ingredientsRepo.findById(ingredientId).get();

		details = detailsRepo.findByRecipeAndIngredient(recipe, ingredient);
		detailsRepo.delete(details);
	}

	public RecipesDetailsModel updateDetailsQuantity(Integer id, RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		Integer ingredientId = details.getIngredient().getId();
		IngredientModel ingredient = ingredientsRepo.findById(ingredientId).get();
		Double quantity = details.getQuantity();

		details = detailsRepo.findByRecipeAndIngredient(recipe, ingredient);
		details.setQuantity(quantity);
		return detailsRepo.save(details);
	}
}
