package com.catering.rest.db.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.catering.rest.db.models.RecipeModel;

public interface RecipesRepository extends PagingAndSortingRepository<RecipeModel, Integer>{
	
}
