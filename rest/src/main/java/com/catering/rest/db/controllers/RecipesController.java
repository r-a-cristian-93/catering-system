package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.RecipeModel;
import com.catering.rest.db.models.RecipesDetailsModel;
import com.catering.rest.db.services.RecipesService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("recipes")
public class RecipesController {
	private final RecipesService recipesService;

	@ResponseBody
	@GetMapping
	public Iterable<RecipeModel> getRecipes() {
		return recipesService.getRecipes();
	}

	@ResponseBody
	@PostMapping
	public RecipeModel addRecipe(@RequestBody RecipeModel recipe) {
		return recipesService.addRecipe(recipe);
	}

	@ResponseBody
	@GetMapping("/{id}")
	public RecipeModel getRecipe(@PathVariable Integer id) {
		return recipesService.getRecipe(id);
	}

	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteRecipe(@PathVariable Integer id) {
		recipesService.deleteRecipe(id);;
	}

	@ResponseBody
	@PutMapping("/{id}")
	public RecipeModel updateRecipe(@PathVariable Integer id, @RequestBody RecipeModel recipe) {
		return recipesService.updateRecipe(id, recipe);
	}


	// PAGEABLE

	@ResponseBody
	@GetMapping("/allPageable")
	public Page<RecipeModel> getRecipesPageable(@RequestParam Integer page, @RequestParam Integer size) {
		return recipesService.getRecipesPageable(page, size);
	}


	//RECIPE DETAILS

	@ResponseBody
	@GetMapping("/{recipeId}/details")
	public List<RecipesDetailsModel> getDetails(@PathVariable Integer recipeId) {
		return recipesService.getDetails(recipeId);
	}

	@ResponseBody
	@PostMapping("/{id}/details")
	public RecipesDetailsModel addDetails(@PathVariable Integer id,	@RequestBody RecipesDetailsModel details) {
		return recipesService.addDetails(id, details);
	}

	@ResponseBody
	@DeleteMapping("/{id}/details")
	public boolean deleteDetails(@PathVariable Integer id, @RequestBody RecipesDetailsModel details) {
		return recipesService.deleteDetails(id, details);
	}

	@ResponseBody
	@PutMapping("/{id}/details")
	public RecipesDetailsModel updateDetailsQuantity(@PathVariable Integer id, @RequestBody RecipesDetailsModel details) {
		return recipesService.updateDetailsQuantity(id, details);
	}
}
