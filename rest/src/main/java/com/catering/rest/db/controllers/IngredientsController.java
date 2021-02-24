package com.catering.rest.db.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.repositories.IngredientsRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("ingredients")
public class IngredientsController {
	IngredientsRepository ingredientsRepo;
	
	@ResponseBody
	@GetMapping
	public Iterable<IngredientModel> getIngredients() {
		return ingredientsRepo.findAll();
	}

	
	@ResponseBody
	@PostMapping
	public IngredientModel addIngredient(@RequestBody IngredientModel ingredient) {
		return ingredientsRepo.save(ingredient);
	}
	
	@ResponseBody
	@GetMapping("/{id}")
	public IngredientModel getIngredient(@PathVariable Integer id) {
		return ingredientsRepo.findById(id).get();
	}
	
	@ResponseBody
	@DeleteMapping("/{id}")
	public void deleteIngredient(@PathVariable Integer id) {
		ingredientsRepo.deleteById(id);
	}
	
	@ResponseBody
	@PutMapping("/{id}")
	public IngredientModel updateIngredient(@PathVariable Integer id, @RequestBody IngredientModel ingredient) {
		Double price = ingredient.getPrice();
		String name = ingredient.getName();
		UnitModel unit = ingredient.getUnit();
		ingredient = ingredientsRepo.findById(id).get();
		
		if(price!=null) {
			ingredient.setPrice(price);
		}
		if(name!=null) {
			ingredient.setName(name);
		}
		if(unit!=null) {
			ingredient.setUnit(unit);
		}
		return ingredientsRepo.save(ingredient);
	}
	
	
	// PAGEABLE
	
	@ResponseBody
	@GetMapping("/allPageable")
	public Page<IngredientModel> getIngredientsPageable(@RequestParam Integer page, @RequestParam Integer size) {
		return ingredientsRepo.findAll(PageRequest.of(page, size));		
	}
}
