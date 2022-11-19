package com.catering.rest.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.catering.rest.db.models.IngredientModel;
import com.catering.rest.db.models.UnitModel;
import com.catering.rest.db.repositories.IngredientsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IngredientsService {
	@Autowired
    private final IngredientsRepository ingredientsRepo;

	public Iterable<IngredientModel> getIngredients() {
		return ingredientsRepo.findAll();
	}

	public IngredientModel addIngredient(IngredientModel ingredient) {
		return ingredientsRepo.save(ingredient);
	}

	public IngredientModel getIngredient(Integer id) {
		return ingredientsRepo.findById(id).get();
	}

	public void deleteIngredient(Integer id) {
		ingredientsRepo.deleteById(id);
	}

	public IngredientModel updateIngredient(Integer id, IngredientModel ingredient) {
		String name = ingredient.getName();
		UnitModel unit = ingredient.getUnit();
		Double price = ingredient.getPrice();

		ingredient = ingredientsRepo.findById(id).get();

		if(name!=null) {
			ingredient.setName(name);
		}
		if(unit!=null) {
			ingredient.setUnit(unit);
		}
		if (price!=null) {
			ingredient.setPrice(price);
		}
		return ingredientsRepo.save(ingredient);
	}


	// PAGEABLE

	public Page<IngredientModel> getIngredientsPageable(Integer page, Integer size) {
		return ingredientsRepo.findAll(PageRequest.of(page, size));
	}

}
