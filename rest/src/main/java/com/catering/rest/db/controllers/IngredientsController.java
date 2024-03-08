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

import com.catering.rest.db.models.IngredientModel;
import com.catering.rest.db.models.IngredientPriceHistoryModel;
import com.catering.rest.db.services.IngredientsService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("ingredients")
public class IngredientsController {
	private final IngredientsService ingredientsService;

	@ResponseBody
	@GetMapping
	public Iterable<IngredientModel> getIngredients() {
		return ingredientsService.getIngredients();
	}

	@ResponseBody
	@PostMapping
	public IngredientModel addIngredient(@RequestBody IngredientModel ingredient) {
		return ingredientsService.addIngredient(ingredient);
	}

	@ResponseBody
	@GetMapping("/{id}")
	public IngredientModel getIngredient(@PathVariable Integer id) {
		return ingredientsService.getIngredient(id);
	}

	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteIngredient(@PathVariable Integer id) {
		ingredientsService.deleteIngredient(id);
	}

	@ResponseBody
	@PutMapping("/{id}")
	public IngredientModel updateIngredient(@PathVariable Integer id, @RequestBody IngredientModel ingredient) {
		return ingredientsService.updateIngredient(id, ingredient);
	}


	@ResponseBody
	@GetMapping("/{ingredientId}/priceHistory")
	public List<IngredientPriceHistoryModel> getPriceHistory(@PathVariable Integer ingredientId)
	{
		return ingredientsService.getPriceHistory(ingredientId);
	}

	// PAGEABLE

	@ResponseBody
	@GetMapping("/allPageable")
	public Page<IngredientModel> getIngredientsPageable(@RequestParam Integer page, @RequestParam Integer size) {
		return ingredientsService.getIngredientsPageable(page, size);
	}
}
