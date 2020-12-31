package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catering.rest.db.models.RecipeModel;
import com.catering.rest.db.repositories.RecipesRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("recipes")
public class RecipesController {
	private final RecipesRepository recipesRepo;
	
	@GetMapping("/all")
	public List<RecipeModel> getRecipes() {
		return recipesRepo.findAll();
	}
	
	@PostMapping("/add")
	public RecipeModel addRecipe(@RequestBody RecipeModel recipe) {
		return recipesRepo.save(recipe);
	}
	
	@DeleteMapping("/{id}/delete")
	public void deleteRecipe(@PathVariable Integer id) {
		recipesRepo.deleteById(id);
	}
	
	@PutMapping("/{id}/update")
	public RecipeModel updateRecipe(@PathVariable Integer id, @RequestBody RecipeModel updateRecipe) {
		RecipeModel recipe = recipesRepo.findById(id).get();
		String name = updateRecipe.getName();
		if(name!=null) {
			recipe.setName(name);
		}		
		return recipesRepo.save(recipe);
	}
}
