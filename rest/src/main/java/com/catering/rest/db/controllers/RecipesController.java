package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.IngredientModel;
import com.catering.rest.db.models.RecipeModel;
import com.catering.rest.db.models.RecipesDetailsModel;
import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.repositories.IngredientsRepository;
import com.catering.rest.db.repositories.RecipesDetailsRepository;
import com.catering.rest.db.repositories.RecipesRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("recipes")
public class RecipesController {
	private final RecipesRepository recipesRepo;
	private final RecipesDetailsRepository detailsRepo;
	private final IngredientsRepository ingredientsRepo;
	
	@ResponseBody
	@GetMapping
	public List<RecipeModel> getRecipes() {
		return recipesRepo.findAll();
	}
	
	@ResponseBody
	@PostMapping
	public RecipeModel addRecipe(@RequestBody RecipeModel recipe) {
		return recipesRepo.save(recipe);
	}
	
	@ResponseBody
	@GetMapping("/{id}")
	public RecipeModel getRecipe(@PathVariable Integer id) {
		return recipesRepo.findById(id).get();
	}
	
	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteRecipe(@PathVariable Integer id) {
		recipesRepo.deleteById(id);
	}
	
	@ResponseBody
	@PutMapping("/{id}")
	public RecipeModel updateRecipe(@PathVariable Integer id, @RequestBody RecipeModel recipe) {
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
	
	//RECIPE DETAILS
	
	@ResponseBody
	@GetMapping("/{id}/details")
	public List<RecipesDetailsModel> getDetails(@PathVariable Integer id) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		return detailsRepo.findByRecipe(recipe);
	}
	
	@ResponseBody
	@PostMapping("/{id}/details")
	public RecipesDetailsModel addDetails(@PathVariable Integer id,	@RequestBody RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		IngredientModel ingredient = ingredientsRepo.findById(details.getIngredient().getId()).get();
		details.setRecipe(recipe);
		details.setIngredient(ingredient);
		return detailsRepo.save(details);
	}	
	
	@ResponseBody
	@DeleteMapping("/{id}/details")
	public void deleteDetails(@PathVariable Integer id, @RequestBody RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		Integer ingredientId = details.getIngredient().getId();
		IngredientModel ingredient = ingredientsRepo.findById(ingredientId).get();
		
		details = detailsRepo.findByRecipeAndIngredient(recipe, ingredient);
		detailsRepo.delete(details);
	}
	
	@ResponseBody
	@PutMapping("/{id}/details")
	public RecipesDetailsModel updateDetailsQuantity(@PathVariable Integer id, @RequestBody RecipesDetailsModel details) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		Integer ingredientId = details.getIngredient().getId();
		IngredientModel ingredient = ingredientsRepo.findById(ingredientId).get();
		Double quantity = details.getQuantity();
		
		details = detailsRepo.findByRecipeAndIngredient(recipe, ingredient);
		details.setQuantity(quantity);
		return detailsRepo.save(details);		
	}	
}


