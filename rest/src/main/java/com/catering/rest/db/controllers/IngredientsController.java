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
import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.repositories.IngredientsRepository;
import com.catering.rest.db.repositories.UnitsRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("ingredients")
public class IngredientsController {
	IngredientsRepository ingredientsRepo;
	UnitsRepository unitsRepo;
	
	@ResponseBody
	@GetMapping("/all")
	public List<IngredientModel> getIngredients() {
		return ingredientsRepo.findAll();
	}
	
	@ResponseBody
	@PostMapping(path= "/add", consumes="application/json")
	public IngredientModel addIngredient(@RequestBody IngredientModel ingredient) {
		return ingredientsRepo.save(ingredient);
	}
	
	@ResponseBody
	@DeleteMapping("/delete")
	public void deleteIngredient(Integer id) {
		ingredientsRepo.deleteById(id);
	}
	
	@ResponseBody
	@PutMapping(path="/{id}/update", consumes="application/json")
	public IngredientModel updateIngredient(@PathVariable Integer id, @RequestBody IngredientModel updateIngredient) {
		IngredientModel ingredient = ingredientsRepo.findById(id).get();
		Integer price = updateIngredient.getPrice();
		String name = updateIngredient.getName();
		UnitModel unit = updateIngredient.getUnit();
		
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
}
